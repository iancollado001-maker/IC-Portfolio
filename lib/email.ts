// Server-only: imported by route handlers, never by client components.
// Sends mail through Resend's REST API (https://resend.com/docs/api-reference/emails/send-email).
// RESEND_API_KEY is provisioned by the Resend integration on the Vercel Marketplace.

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const TIMEOUT_MS = 10_000;

export class EmailNotConfiguredError extends Error {
  constructor() {
    super("RESEND_API_KEY is not set");
    this.name = "EmailNotConfiguredError";
  }
}

export class EmailSendError extends Error {
  constructor(
    message: string,
    readonly status?: number
  ) {
    super(message);
    this.name = "EmailSendError";
  }
}

export type OutgoingEmail = {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
};

export async function sendEmail(email: OutgoingEmail): Promise<{ id: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new EmailNotConfiguredError();

  let res: Response;
  try {
    res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: email.from,
        to: [email.to],
        reply_to: email.replyTo,
        subject: email.subject,
        text: email.text,
        html: email.html,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
  } catch (err) {
    const reason = err instanceof Error ? err.name : "unknown";
    throw new EmailSendError(`Email provider request failed (${reason})`);
  }

  if (!res.ok) {
    // Resend error bodies contain a safe, non-secret message; keep it for server logs only.
    const detail = await res.text().catch(() => "");
    throw new EmailSendError(`Email provider returned ${res.status}: ${detail.slice(0, 300)}`, res.status);
  }

  const body = (await res.json().catch(() => ({}))) as { id?: string };
  return { id: body.id ?? "" };
}
