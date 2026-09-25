import SectionPanel from "./ui/SectionPanel";
import { awards } from "@/lib/site-config";
import { sectionIcons } from "@/lib/section-icons";

export default function Certifications() {
  const AwardIcon = sectionIcons.certifications;
  return (
    <SectionPanel
      id="certifications"
      icon={AwardIcon}
      title="Certifications & Awards"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {awards.map((award) => (
          <div
            key={award.title}
            className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft"
          >
            {/* Badge medallion, echoing the reference credential card */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-panel shadow-soft">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-accent/50 bg-accent-soft">
                <AwardIcon className="h-5 w-5 text-accent-text" aria-hidden />
              </span>
            </div>
            <h3 className="mt-4 font-display text-base font-bold leading-snug">
              {award.title}
            </h3>
            {award.subtitle && (
              <p className="mt-3 text-sm italic leading-relaxed text-muted">
                {award.subtitle}
              </p>
            )}
            {award.detail && (
              <p className="mt-2 font-mono text-[11px] text-muted">{award.detail}</p>
            )}
            {award.period && (
              <p className="mt-auto pt-4">
                <span className="inline-flex rounded-full bg-foreground px-3 py-1 font-mono text-[11px] text-background">
                  {award.period}
                </span>
              </p>
            )}
          </div>
        ))}
      </div>
    </SectionPanel>
  );
}
