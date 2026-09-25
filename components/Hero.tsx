"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Download, Github } from "lucide-react";
import { personal, availability } from "@/lib/site-config";

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="scroll-mt-20 px-4 pb-4 pt-8 sm:px-8 sm:pt-10 lg:scroll-mt-6 lg:px-10 lg:pt-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col-reverse gap-6 md:flex-row md:items-start md:justify-between"
      >
        <div className="min-w-0">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 shadow-soft">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                availability.isAvailable ? "bg-success" : "bg-muted"
              }`}
            />
            <span className="font-mono text-[11px] tracking-wide text-muted">
              {availability.isAvailable ? availability.label : availability.unavailableLabel}
            </span>
          </div>

          <h1
            id="home-heading"
            className="font-display text-balance text-5xl font-extrabold leading-[1.02] tracking-tight [word-spacing:0.12em] sm:text-6xl xl:text-7xl"
          >
            {personal.name}
          </h1>
          <p className="mt-4 text-base font-medium text-muted sm:text-lg">
            {personal.tagline}
          </p>
          <p className="mt-4 max-w-2xl text-balance text-[15px] leading-relaxed text-muted">
            {personal.intro}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/#projects"
              className="group flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              View My Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={personal.resumePath}
              download
              className="flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium shadow-soft transition-colors hover:bg-foreground hover:text-background"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>

        <Link
          href="/#contact"
          className="group inline-flex shrink-0 items-center gap-2 self-end rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-soft transition-opacity hover:opacity-85 md:self-start"
        >
          Get in touch
          <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </motion.div>
    </section>
  );
}
