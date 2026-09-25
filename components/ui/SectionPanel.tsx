import type { LucideIcon } from "lucide-react";
import IconTile from "./IconTile";

// Large rounded container used for every full-length section below the home overview.
export default function SectionPanel({
  id,
  icon,
  title,
  eyebrow,
  description,
  aside,
  children,
}: {
  id: string;
  icon: LucideIcon;
  title: string;
  eyebrow?: string;
  description?: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="scroll-mt-20 px-4 py-4 sm:px-8 lg:scroll-mt-6 lg:px-10"
    >
      <div className="glow-panel rounded-[1.75rem] p-5 sm:p-8 lg:p-10">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <IconTile icon={icon} />
            <div>
              {eyebrow && (
                <div className="font-mono text-[11px] font-medium tracking-wide text-accent-text">
                  {eyebrow}
                </div>
              )}
              <h2
                id={headingId}
                className="font-display text-2xl font-bold tracking-tight sm:text-3xl"
              >
                {title}
              </h2>
              {description && (
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                  {description}
                </p>
              )}
            </div>
          </div>
          {aside}
        </header>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
