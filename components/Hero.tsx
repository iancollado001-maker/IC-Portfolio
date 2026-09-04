"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github } from "lucide-react";
import { personal, availability } from "@/lib/site-config";

const terminalLines = [
  { prompt: "ian@dev", cmd: "whoami" },
  { output: "Ian L. Collado — Software Developer" },
  { prompt: "ian@dev", cmd: "cat focus.txt" },
  { output: "web · desktop · mobile · IT support" },
  { prompt: "ian@dev", cmd: "./build --status" },
  { output: availability.isAvailable ? availability.label : availability.unavailableLabel },
];

function TerminalWindow() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= terminalLines.length) return;
    const delay = terminalLines[visibleLines]?.cmd ? 550 : 320;
    const t = setTimeout(() => setVisibleLines((v) => v + 1), delay);
    return () => clearTimeout(t);
  }, [visibleLines]);

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_0_0_var(--border)]">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full border border-border" />
        <span className="h-2.5 w-2.5 rounded-full border border-border" />
        <span className="h-2.5 w-2.5 rounded-full border border-border" />
        <span className="ml-3 font-mono text-[11px] text-muted">
          ian@dev — zsh
        </span>
      </div>
      <div className="thin-scroll h-64 overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed">
        {terminalLines.slice(0, visibleLines).map((line, i) =>
          line.cmd ? (
            <div key={i} className="flex gap-2">
              <span className="text-muted">{line.prompt} $</span>
              <span className="text-foreground">{line.cmd}</span>
            </div>
          ) : (
            <div key={i} className="mb-3 pl-0 text-muted">
              {line.output}
            </div>
          )
        )}
        {visibleLines < terminalLines.length && (
          <span className="inline-block h-3.5 w-2 animate-pulse bg-foreground align-middle" />
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden border-b border-border pt-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black_10%,transparent_75%)]" />

      <div className="relative mx-auto grid w-full max-w-content gap-16 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                availability.isAvailable ? "bg-signal" : "bg-muted"
              }`}
            />
            <span className="font-mono text-[11px] tracking-wide text-muted">
              {availability.isAvailable ? availability.label : availability.unavailableLabel}
            </span>
          </div>

          <h1 className="font-display text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl">
            {personal.name}
          </h1>
          <p className="mt-4 font-mono text-sm text-muted sm:text-base">
            {personal.tagline}
          </p>
          <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted sm:text-lg">
            {personal.intro}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="/#projects"
              className="group flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              View My Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={personal.resumePath}
              download
              className="flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="flex justify-center lg:justify-end"
        >
          <TerminalWindow />
        </motion.div>
      </div>
    </section>
  );
}
