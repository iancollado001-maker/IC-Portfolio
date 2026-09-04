"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Github } from "lucide-react";
import ProjectModal from "./ProjectModal";
import { projects, type Project } from "@/lib/site-config";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Projects() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const count = projects.length;
  const active = projects[index];

  useEffect(() => setHovered(false), [index]);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % count),
    [count]
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + count) % count),
    [count]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (modalProject) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, modalProject]);

  return (
    <section id="projects" className="border-b border-border py-24">
      <div className="mx-auto max-w-content px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-muted">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal" />
            FEATURED WORK
          </div>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Projects
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            A thesis project applying predictive analytics to education,
            and a training-ground inventory system built on the job.
          </p>
        </motion.div>

        {/* Selector */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
          className="mt-10 flex items-center justify-between gap-6"
        >
          <div className="thin-scroll -mx-1 flex gap-2 overflow-x-auto px-1">
            {projects.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                className={`relative shrink-0 rounded-full border px-4 py-2 font-mono text-xs transition-colors duration-200 ${
                  i === index
                    ? "border-transparent text-background"
                    : "border-border text-muted hover:text-foreground"
                }`}
              >
                {i === index && (
                  <motion.span
                    layoutId="project-tab"
                    className="absolute inset-0 rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative z-10">
                  {pad(i + 1)} {p.title}
                </span>
              </button>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden font-mono text-[11px] tabular-nums text-muted sm:inline">
              ( {pad(index + 1)} / {pad(count)} )
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous project"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-foreground hover:text-background"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next project"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-foreground hover:text-background"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
          className="mt-8"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{ duration: 0.32, ease: "easeOut" }}
            >
              <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                {/* Image column: screenshot + quick-switch archive */}
                <div className="flex min-w-0 flex-col gap-6">
                {/* Screenshot container — sized to show the whole image */}
                <figure
                  className="group relative overflow-hidden rounded-2xl border border-border bg-background"
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  {active.image && (
                    <div className="relative aspect-[21/10] w-full">
                      <Image
                        src={active.image}
                        alt={active.imageAlt ?? `${active.title} screenshot`}
                        fill
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="object-contain"
                        quality={85}
                        priority={index === 0}
                      />
                      {active.imageHover && (
                        <motion.div
                          aria-hidden
                          initial={false}
                          animate={{ opacity: hovered ? 1 : 0 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                          className="pointer-events-none absolute inset-0 bg-background"
                        >
                          <Image
                            src={active.imageHover}
                            alt={active.imageHoverAlt ?? `${active.title} alternate screenshot`}
                            fill
                            sizes="(min-width: 1024px) 55vw, 100vw"
                            className="object-contain"
                            quality={85}
                          />
                        </motion.div>
                      )}
                    </div>
                  )}
                  {active.imageHover && (
                    <div className="pointer-events-none absolute right-3 top-3 rounded-full border border-white/25 bg-black/35 px-2.5 py-1 font-mono text-[10px] tracking-wide text-white backdrop-blur-sm">
                      HOVER TO PREVIEW
                    </div>
                  )}
                  <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/25 bg-black/35 px-2.5 py-1 font-mono text-[10px] tracking-wide text-white backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    LIVE UI // {active.slug.toUpperCase()}
                  </div>
                  <div className="absolute bottom-3 left-3 rounded-full border border-white/25 bg-black/35 px-2.5 py-1 font-mono text-[10px] tracking-wide text-white backdrop-blur-sm">
                    CASE {pad(index + 1)} — {pad(count)}
                  </div>
                </figure>

                  {/* Quick-switch archive */}
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-muted">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal" />
                        QUICK SWITCH ARCHIVE
                      </div>
                    </div>
                    <div className="thin-scroll -mx-1 mt-3 flex gap-3 overflow-x-auto px-1 pb-1">
                      {projects.map((p, i) => (
                        <button
                          key={p.slug}
                          type="button"
                          onClick={() => setIndex(i)}
                          aria-pressed={i === index}
                          className={`group w-40 shrink-0 overflow-hidden rounded-xl border text-left transition-colors ${
                            i === index
                              ? "border-foreground"
                              : "border-border hover:border-foreground/50"
                          }`}
                        >
                          <div className="relative aspect-[21/10] w-full overflow-hidden bg-grid-pattern">
                            {p.image && (
                              <Image
                                src={p.image}
                                alt=""
                                fill
                                sizes="160px"
                                className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                              />
                            )}
                          </div>
                          <div className="flex items-center gap-2 px-3 py-2.5">
                            <span
                              className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                                i === index ? "bg-signal" : "bg-muted"
                              }`}
                            />
                            <span className="truncate font-mono text-[11px]">
                              {pad(i + 1)} {p.title}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Details container — independent of the image */}
                <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full border border-border px-3 py-1 font-mono text-[10px] tracking-wide text-muted">
                      {active.badge.toUpperCase()}
                    </span>
                    <span className="font-mono text-[11px] text-muted">
                      CASE {pad(index + 1)} — {pad(count)}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                    {active.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                    {active.description}
                  </p>

                  <div className="mt-6">
                    <div className="font-mono text-[11px] tracking-wide text-muted">
                      TECHNOLOGY STACK MATRIX
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {active.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-border bg-background px-3 py-1.5 font-mono text-xs text-foreground/80 transition-colors hover:border-foreground/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="font-mono text-[11px] tracking-wide text-muted">
                      KEY HIGHLIGHTS
                    </div>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {active.highlights.map((h, i) => (
                        <div
                          key={h}
                          className="flex items-start gap-3 rounded-xl border border-border bg-background p-3"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border font-mono text-[10px] text-muted">
                            {pad(i + 1)}
                          </span>
                          <span className="text-sm leading-relaxed text-muted">
                            {h}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-end gap-3 border-t border-border pt-5 lg:mt-8">
                    <a
                      href={active.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                    <button
                      type="button"
                      onClick={() => setModalProject(active)}
                      className="flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
                    >
                      {active.caseStudy ? "View Case Study" : "More Details"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </section>
  );
}