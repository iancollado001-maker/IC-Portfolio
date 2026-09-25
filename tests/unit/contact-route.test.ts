import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/contact/route";
import { personal } from "@/lib/site-config";

const valid = { name: "Ada Lovelace", email: "ada@example.com", message: "Hello there" };

let ipCounter = 0;

function request(body: unknown, headers: Record<string, string> = {}) {
  // A fresh client IP per request keeps the module-level rate limiter out of unrelated tests.
  ipCounter += 1;
  return new NextRequest("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      host: "localhost:3000",
      "x-forwarded-for": `10.0.0.${ipCounter}`,
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
  vi.stubEnv("RESEND_API_KEY", "re_test_key");
  vi.stubEnv("CONTACT_TO_EMAIL", "");
  vi.stubEnv("CONTACT_FROM_EMAIL", "");
  vi.spyOn(console, "info").mockImplementation(() => undefined);
  vi.spyOn(console, "error").mockImplementation(() => undefined);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("POST /api/contact", () => {
  it("sends the message through Resend and returns ok", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ id: "email_1" }), { status: 200 }));

    const res = await POST(request(valid));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(res.headers.get("cache-control")).toBe("private, no-store");

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect((init.headers as Record<string, string>).Authorization).toBe("Bearer re_test_key");
    const sent = JSON.parse(init.body as string);
    expect(sent.to).toEqual([personal.email]);
    expect(sent.reply_to).toBe(valid.email);
    expect(sent.text).toContain(valid.message);
  });

  it("honours CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL", async () => {
    vi.stubEnv("CONTACT_TO_EMAIL", "inbox@example.com");
    vi.stubEnv("CONTACT_FROM_EMAIL", "Portfolio <hello@example.com>");
    fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));

    await POST(request(valid));

    const sent = JSON.parse((fetchMock.mock.calls[0] as [string, RequestInit])[1].body as string);
    expect(sent.to).toEqual(["inbox@example.com"]);
    expect(sent.from).toBe("Portfolio <hello@example.com>");
  });

  it("returns 503 without calling the provider when no API key is configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");

    const res = await POST(request(valid));
    const body = await res.json();

    expect(res.status).toBe(503);
    expect(body.error.code).toBe("EMAIL_NOT_CONFIGURED");
    expect(body.error.requestId).toEqual(expect.any(String));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns 502 with a generic message when the provider fails", async () => {
    fetchMock.mockResolvedValue(new Response('{"message":"domain not verified"}', { status: 403 }));

    const res = await POST(request(valid));
    const body = await res.json();

    expect(res.status).toBe(502);
    expect(body.error.code).toBe("EMAIL_SEND_FAILED");
    expect(body.error.message).not.toContain("domain");
  });

  it("returns 502 when the provider is unreachable", async () => {
    fetchMock.mockRejectedValue(new TypeError("fetch failed"));
    const res = await POST(request(valid));
    expect(res.status).toBe(502);
  });

  it("rejects invalid fields with 400 and names them", async () => {
    const res = await POST(request({ ...valid, email: "nope" }));
    const body = await res.json();
    expect(res.status).toBe(400);
    expect(body.error.code).toBe("VALIDATION_ERROR");
    expect(body.error.details.fields).toEqual(["email"]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON with 400", async () => {
    const res = await POST(request("{not json"));
    expect(res.status).toBe(400);
    expect((await res.json()).error.code).toBe("INVALID_JSON");
  });

  it("rejects oversized bodies with 413", async () => {
    const res = await POST(request({ ...valid, message: "a".repeat(20_000) }));
    expect(res.status).toBe(413);
  });

  it("rejects cross-origin posts with 403", async () => {
    const res = await POST(request(valid, { origin: "https://evil.example" }));
    expect(res.status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("accepts same-origin posts", async () => {
    fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));
    const res = await POST(request(valid, { origin: "http://localhost:3000" }));
    expect(res.status).toBe(200);
  });

  it("silently drops honeypot submissions", async () => {
    const res = await POST(request({ ...valid, company: "bot" }));
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rate limits a client after 5 requests in the window", async () => {
    fetchMock.mockImplementation(async () => new Response("{}", { status: 200 }));
    const ip = { "x-forwarded-for": "192.0.2.50" };
    for (let i = 0; i < 5; i += 1) {
      expect((await POST(request(valid, ip))).status).toBe(200);
    }
    const limited = await POST(request(valid, ip));
    expect(limited.status).toBe(429);
    expect(Number(limited.headers.get("retry-after"))).toBeGreaterThan(0);
  });
});
