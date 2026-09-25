"use client";

import { useState, type FormEvent } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import SectionPanel from "./ui/SectionPanel";
import { personal, sectionIntros } from "@/lib/site-config";
import { sectionIcons } from "@/lib/section-icons";
import { CONTACT_LIMITS } from "@/lib/contact";

type Status = "idle" | "sending" | "sent" | "error";

const channelClass =
  "flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-sm font-medium shadow-soft transition-colors hover:border-foreground/30";
const iconBadge =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-text";
const inputClass =
  "mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm shadow-soft outline-none transition-colors focus:border-foreground";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMessage("");
    const form = e.currentTarget;
    const field = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement).value;
    const data = {
      name: field("name"),
      email: field("email"),
      message: field("message"),
      company: field("company"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(20_000),
      });
      if (!res.ok) {
        const body: unknown = await res.json().catch(() => null);
        const message =
          body && typeof body === "object" && "error" in body
            ? (body as { error?: { message?: string } }).error?.message
            : undefined;
        throw new Error(message ?? "Request failed");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setErrorMessage(err instanceof Error && err.name !== "TimeoutError" ? err.message : "");
      setStatus("error");
    }
  }

  return (
    <SectionPanel
      id="contact"
      icon={sectionIcons.contact}
      title="Contact"
      description={sectionIntros.contact}
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-3">
          <a href={`mailto:${personal.email}`} className={channelClass}>
            <span className={iconBadge}>
              <Mail className="h-4 w-4" />
            </span>
            <span className="min-w-0 break-all">{personal.email}</span>
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className={channelClass}
          >
            <span className={iconBadge}>
              <Github className="h-4 w-4" />
            </span>
            <span className="min-w-0 break-all">github.com/{personal.githubUsername}</span>
          </a>
          {personal.linkedin ? (
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={channelClass}
            >
              <span className={iconBadge}>
                <Linkedin className="h-4 w-4" />
              </span>
              LinkedIn
            </a>
          ) : (
            <div className="flex items-center gap-3 rounded-2xl border border-dashed border-border p-4 text-sm text-muted">
              <span className={iconBadge}>
                <Linkedin className="h-4 w-4" />
              </span>
              LinkedIn — Not yet available. Please reach out via email or GitHub.
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot: hidden from people and assistive tech; bots that fill it are ignored. */}
          <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <div>
            <label htmlFor="name" className="font-mono text-[11px] text-muted">
              NAME
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={CONTACT_LIMITS.name}
              autoComplete="name"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className="font-mono text-[11px] text-muted">
              EMAIL
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={CONTACT_LIMITS.email}
              autoComplete="email"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="message" className="font-mono text-[11px] text-muted">
              MESSAGE
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              maxLength={CONTACT_LIMITS.message}
              className={`${inputClass} resize-none`}
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
          <div aria-live="polite">
            {status === "sent" && (
              <p className="text-sm text-success">
                Message sent. Thanks for reaching out — I&apos;ll reply soon.
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="text-sm text-accent-text">
                {errorMessage ? `${errorMessage} ` : "Something went wrong. "}
                Please email {personal.email} directly.
              </p>
            )}
          </div>
        </form>
      </div>
    </SectionPanel>
  );
}
