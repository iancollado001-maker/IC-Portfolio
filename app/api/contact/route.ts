import { NextRequest, NextResponse } from "next/server";
import { buildContactEmail, validateContact } from "@/lib/contact";
import { EmailNotConfiguredError, sendEmail } from "@/lib/email";
import { createRateLimiter } from "@/lib/rate-limit";
import { personal } from "@/lib/site-config";

// Delivers contact-form messages by email through Resend.
// Env: RESEND_API_KEY (required to send), CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL (optional).

const MAX_BODY_BYTES = 16 * 1024;
const rateLimit = createRateLimiter({ limit: 5, windowMs: 15 * 60 * 1000 });

type ErrorCode =
  | "FORBIDDEN_ORIGIN"
  | "PAYLOAD_TOO_LARGE"
  | "INVALID_JSON"
  | "VALIDATION_ERROR"
  | "RATE_LIMITED"
  | "EMAIL_NOT_CONFIGURED"
  | "EMAIL_SEND_FAILED";

function errorResponse(
  requestId: string,
  status: number,
  code: ErrorCode,
  message: string,
  extra?: { details?: unknown; headers?: Record<string, string> }
) {
  return NextResponse.json(
    { error: { code, message, details: extra?.details, requestId } },
    { status, headers: { "Cache-Control": "private, no-store", ...extra?.headers } }
  );
}

function log(level: "info" | "warn" | "error", event: string, fields: Record<string, unknown>) {
  console[level](JSON.stringify({ level, event, route: "/api/contact", ...fields }));
}

function isSameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  // Browsers always send Origin on cross-site POSTs; its absence means a same-origin or non-browser client.
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

function clientKey(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: NextRequest) {
  const requestId = crypto.randomUUID();

  if (!isSameOrigin(req)) {
    return errorResponse(requestId, 403, "FORBIDDEN_ORIGIN", "Cross-origin requests are not allowed.");
  }

  const declaredLength = Number(req.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return errorResponse(requestId, 413, "PAYLOAD_TOO_LARGE", "Your message is too long.");
  }

  const limited = rateLimit(clientKey(req));
  if (!limited.allowed) {
    return errorResponse(
      requestId,
      429,
      "RATE_LIMITED",
      "Too many messages. Please try again later.",
      { headers: { "Retry-After": String(limited.retryAfterSeconds) } }
    );
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return errorResponse(requestId, 413, "PAYLOAD_TOO_LARGE", "Your message is too long.");
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return errorResponse(requestId, 400, "INVALID_JSON", "Invalid request.");
  }

  const result = validateContact(payload);
  if (!result.ok) {
    return errorResponse(requestId, 400, "VALIDATION_ERROR", result.message, {
      details: { fields: result.fields },
    });
  }

  // Honeypot filled: report success so bots learn nothing, but send nothing.
  if (result.isSpam) {
    log("info", "contact.spam_dropped", { requestId });
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "private, no-store" } });
  }

  const { subject, text, html } = buildContactEmail(result.data);
  try {
    const { id } = await sendEmail({
      to: process.env.CONTACT_TO_EMAIL || personal.email,
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
      replyTo: result.data.email,
      subject,
      text,
      html,
    });
    log("info", "contact.sent", { requestId, emailId: id });
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (err) {
    if (err instanceof EmailNotConfiguredError) {
      log("error", "contact.not_configured", { requestId });
      return errorResponse(
        requestId,
        503,
        "EMAIL_NOT_CONFIGURED",
        "The contact form can't send messages right now."
      );
    }
    log("error", "contact.send_failed", {
      requestId,
      error: err instanceof Error ? err.message : "unknown",
    });
    return errorResponse(
      requestId,
      502,
      "EMAIL_SEND_FAILED",
      "Your message couldn't be sent right now."
    );
  }
}
