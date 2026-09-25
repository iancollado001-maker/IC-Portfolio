import { describe, expect, it } from "vitest";
import { buildContactEmail, CONTACT_LIMITS, escapeHtml, validateContact } from "@/lib/contact";
import { DEVELOPER_ATTRIBUTION } from "@/lib/attribution";

const valid = { name: "Ada Lovelace", email: "ada@example.com", message: "Hello there" };

describe("validateContact", () => {
  it("accepts a well-formed message and trims whitespace", () => {
    const result = validateContact({ ...valid, name: "  Ada Lovelace  " });
    expect(result).toEqual({ ok: true, data: valid, isSpam: false });
  });

  it.each([null, "text", 42, []])("rejects non-object payload %j", (input) => {
    expect(validateContact(input).ok).toBe(false);
  });

  it("reports every missing or whitespace-only field", () => {
    const result = validateContact({ name: "   ", email: "", message: "\n\t" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.fields).toEqual(["name", "email", "message"]);
  });

  it("rejects wrong types instead of coercing them", () => {
    const result = validateContact({ name: 123, email: ["a@b.co"], message: { x: 1 } });
    expect(result.ok).toBe(false);
  });

  it.each(["plainaddress", "a@b", "a b@c.com", "<a@b.com>", "a@b.c"])(
    "rejects invalid email %s",
    (email) => {
      expect(validateContact({ ...valid, email }).ok).toBe(false);
    }
  );

  it("enforces length limits at max + 1", () => {
    expect(validateContact({ ...valid, name: "a".repeat(CONTACT_LIMITS.name) }).ok).toBe(true);
    expect(validateContact({ ...valid, name: "a".repeat(CONTACT_LIMITS.name + 1) }).ok).toBe(false);
    expect(validateContact({ ...valid, message: "a".repeat(CONTACT_LIMITS.message + 1) }).ok).toBe(false);
  });

  it("strips CR/LF from single-line fields so they cannot inject email headers", () => {
    const result = validateContact({ ...valid, name: "Eve\r\nBcc: victim@example.com" });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.name).toBe("EveBcc: victim@example.com");
  });

  it("keeps newlines, emoji and RTL text in the message", () => {
    const message = "Line one\nمرحبا 👋";
    const result = validateContact({ ...valid, message });
    expect(result.ok && result.data.message).toBe(message);
  });

  it("flags the honeypot field as spam", () => {
    const result = validateContact({ ...valid, company: "Spam Inc" });
    expect(result.ok && result.isSpam).toBe(true);
  });
});

describe("escapeHtml", () => {
  it("neutralises markup", () => {
    expect(escapeHtml(`<script>alert("x")</script>&'`)).toBe(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;&amp;&#39;"
    );
  });
});

describe("buildContactEmail", () => {
  it("escapes user input in HTML and carries the developer attribution", () => {
    const email = buildContactEmail({ ...valid, message: "<img src=x onerror=alert(1)>" });
    expect(email.subject).toBe("Portfolio contact from Ada Lovelace");
    expect(email.html).not.toContain("<img");
    expect(email.html).toContain("&lt;img src=x onerror=alert(1)&gt;");
    for (const part of [email.text, email.html]) {
      expect(part).toContain(DEVELOPER_ATTRIBUTION.name);
      expect(part).toContain(DEVELOPER_ATTRIBUTION.phone);
      expect(part).toContain(DEVELOPER_ATTRIBUTION.email);
    }
  });
});
