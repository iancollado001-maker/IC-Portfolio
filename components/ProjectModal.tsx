"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Github, X, Award } from "lucide-react";
import type { Project } from "@/lib/site-config";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} details`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="thin-scroll max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-card"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-border glass-surface px-6 py-4">
              <div>
                <span className="font-mono text-[10px] tracking-wide text-muted">
                  {project.badge.toUpperCase()}
                </span>
                <h3 className="font-display text-xl font-semibold">
                  {project.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-foreground hover:text-background"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {project.image && (
              <div className="relative aspect-[21/10] w-full overflow-hidden border-b border-border bg-card">
                <Image
                  src={project.image}
                  alt={project.imageAlt ?? `${project.title} screenshot`}
                  fill
                  sizes="(min-width: 672px) 672px, 100vw"
                  className="object-cover"
                />
              </div>
            )}

            <div className="space-y-6 p-6">
              <p className="text-sm leading-relaxed text-muted">
                {project.description}
              </p>

              <div>
                <h4 className="font-mono text-[11px] tracking-wide text-muted">
                  TECHNOLOGIES
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-3 py-1 text-xs font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono text-[11px] tracking-wide text-muted">
                  KEY FEATURES
                </h4>
                <ul className="mt-2 space-y-1.5 text-sm text-muted">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {project.caseStudy && (
                <div className="space-y-5 border-t border-border pt-5">
                  <div>
                    <h4 className="font-mono text-[11px] tracking-wide text-muted">
                      PROBLEM
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {project.caseStudy.problem}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-mono text-[11px] tracking-wide text-muted">
                      SOLUTION
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {project.caseStudy.solution}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-mono text-[11px] tracking-wide text-muted">
                      PROJECT ROLE
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {project.caseStudy.role}
                    </p>
                  </div>
                  {project.caseStudy.recognition && (
                    <div className="rounded-xl border border-border p-4">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        <span className="text-sm font-semibold">
                          {project.caseStudy.recognition.title}
                        </span>
                      </div>
                      <p className="mt-2 text-sm italic leading-relaxed text-muted">
                        &ldquo;{project.caseStudy.recognition.paperTitle}&rdquo;
                      </p>
                      <p className="mt-1 font-mono text-[11px] text-muted">
                        {project.caseStudy.recognition.publication}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
              >
                <Github className="h-4 w-4" />
                View Repository
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
