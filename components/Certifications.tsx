import { Award as AwardIcon } from "lucide-react";
import { awards } from "@/lib/site-config";

export default function Certifications() {
  return (
    <section id="certifications" className="border-b border-border py-24">
      <div className="mx-auto max-w-content px-6">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Certifications &amp; Awards
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {awards.map((award) => (
            <div
              key={award.title}
              className="flex flex-col rounded-2xl border border-border bg-card p-6"
            >
              <AwardIcon className="h-5 w-5 text-muted" />
              <h3 className="mt-4 font-display text-base font-semibold leading-snug">
                {award.title}
              </h3>
              {award.subtitle && (
                <p className="mt-3 text-sm italic leading-relaxed text-muted">
                  {award.subtitle}
                </p>
              )}
              {award.detail && (
                <p className="mt-2 font-mono text-[11px] text-muted">
                  {award.detail}
                </p>
              )}
              {award.period && (
                <p className="mt-auto pt-4 font-mono text-[11px] text-muted">
                  {award.period}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}