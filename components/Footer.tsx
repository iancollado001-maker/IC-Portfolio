import Link from "next/link";
import { ArrowUp, Code2, Github, Linkedin, Mail } from "lucide-react";
import { nav, personal } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-content px-6">
        <div className="grid gap-12 py-16 md:grid-cols-[1.3fr_0.7fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/#home"
              aria-label="IC Portfolio — home"
              className="group inline-flex items-center gap-2.5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors duration-300 group-hover:bg-foreground group-hover:text-background">
                <Code2 className="h-4 w-4" />
              </span>
              <span className="font-display text-base font-semibold tracking-tight">
                IC<span className="text-muted">/</span>Portfolio
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              A software developer portfolio by {personal.name} — web,
              desktop, and mobile projects built to solve real-world
              problems.
            </p>
          </div>

          {/* Explore */}
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
              Explore
            </div>
            <ul className="mt-5 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in touch */}
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
              Get in touch
            </div>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4" />
                  {personal.email}
                </a>
              </li>
              <li>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <Github className="h-4 w-4" />
                  @{personal.githubUsername}
                </a>
              </li>
              {personal.linkedin && (
                <li>
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-foreground"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-4 border-t border-border py-7 sm:flex-row sm:justify-between">
          <p className="font-mono text-[11px] text-muted">
            © {new Date().getFullYear()} {personal.name}
          </p>
          <p className="font-mono text-[11px] text-muted">
            Built with Next.js · TypeScript · Tailwind CSS
          </p>
          <a
            href="/#home"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted transition-colors hover:text-foreground"
          >
            BACK TO TOP
            <ArrowUp className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}