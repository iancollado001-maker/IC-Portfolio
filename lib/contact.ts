import { DEVELOPER_ATTRIBUTION as dev } from "./attribution";

// Shared by the form (maxLength) and the API (server-side validation).
export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  message: 5000,
} as const;

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

export type ValidationResult =
  | { ok: true; data: ContactMessage; isSpam: boolean }
  | { ok: false; message: string; fields: string[] };

const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

// Strip control characters (keeps newlines and tabs in the message body).
function clean(value: string, multiline: boolean): string {
  const pattern = multiline
    ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g
    : /[\u0000-\u001F\u007F]/g;
  return value.replace(pattern, "").trim();
}

export function validateContact(input: unknown): ValidationResult {
  if (!input || typeof input !== "object") {
    return { ok: false, message: "Invalid request.", fields: [] };
  }
  const raw = input as Record<string, unknown>;
  const str = (key: string) => (typeof raw[key] === "string" ? (raw[key] as string) : "");

  const name = clean(str("name"), false);
  const email = clean(str("email"), false);
  const message = clean(str("message"), true);
  const isSpam = str("company").trim().length > 0;

  const fields: string[] = [];
  if (!name || name.length > CONTACT_LIMITS.name) fields.push("name");
  if (!email || email.length > CONTACT_LIMITS.email || !EMAIL_PATTERN.test(email)) {
    fields.push("email");
  }
  if (!message || message.length > CONTACT_LIMITS.message) fields.push("message");

  if (fields.length > 0) {
    const labels = fields.join(", ");
    return { ok: false, message: `Please check the following field(s): ${labels}.`, fields };
  }
  return { ok: true, data: { name, email, message }, isSpam };
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const attributionLine = `${dev.name}, ${dev.phone}, ${dev.email}`;

export function buildContactEmail({ name, email, message }: ContactMessage) {
  const subject = `Portfolio contact from ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    message,
    "",
    "—",
    attributionLine,
  ].join("\n");
  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#0f1b3d">
<p><strong>Name:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(email)}</p>
<p style="white-space:pre-wrap">${escapeHtml(message)}</p>
<hr style="border:none;border-top:1px solid #e2e0d8">
<p style="font-size:12px;color:#535b70">${escapeHtml(attributionLine)}</p>
</div>`;
  return { subject, text, html };
}
