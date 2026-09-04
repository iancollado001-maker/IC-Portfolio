"use client";

import { useState, type FormEvent } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { personal } from "@/lib/site-config";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-content px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Contact
            </h2>
            <p className="mt-4 max-w-sm text-balance leading-relaxed text-muted">
              Open to opportunities in software development and IT support.
              Reach out through any of the channels below.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-3 rounded-xl border border-border p-4 text-sm font-medium transition-colors hover:border-foreground/40"
              >
                <Mail className="h-4 w-4" />
                {personal.email}
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-border p-4 text-sm font-medium transition-colors hover:border-foreground/40"
              >
                <Github className="h-4 w-4" />
                github.com/{personal.githubUsername}
              </a>
              {personal.linkedin ? (
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border p-4 text-sm font-medium transition-colors hover:border-foreground/40"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              ) : (
                <div className="flex items-center gap-3 rounded-xl border border-dashed border-border p-4 text-sm text-muted">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn — add profile link in site-config.ts
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="font-mono text-[11px] text-muted">
                NAME
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
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
                className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
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
                className="mt-2 w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
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
            {status === "sent" && (
              <p className="text-sm text-muted">
                Message sent. Thanks for reaching out — I&apos;ll reply soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-muted">
                Something went wrong. Please email {personal.email} directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
