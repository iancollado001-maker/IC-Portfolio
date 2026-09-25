import SectionPanel from "./ui/SectionPanel";
import { education } from "@/lib/site-config";
import { sectionIcons } from "@/lib/section-icons";

function BulletList({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mt-5">
      <div className="font-mono text-[11px] tracking-wide text-accent-text">{label}</div>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
        {items.map((h) => (
          <li key={h} className="flex gap-2.5">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Education() {
  return (
    <SectionPanel id="education" icon={sectionIcons.education} title="Education">
      <ol className="space-y-4">
        {education.map((item, i) => (
          <li
            key={item.school}
            className="grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft sm:grid-cols-[180px_1fr] sm:gap-10 sm:p-8"
          >
            <div className="font-mono text-[11px] text-muted">
              <div className="mb-3 text-2xl font-semibold text-accent-text">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>{item.period}</div>
              <div className="mt-1">{item.location}</div>
            </div>

            <div>
              <h3 className="font-display text-xl font-bold">{item.school}</h3>
              <p className="mt-1 text-sm text-muted">{item.program}</p>

              {item.description && (
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              )}

              {item.highlights && item.highlights.length > 0 && (
                <BulletList label="HIGHLIGHTS" items={item.highlights} />
              )}

              {item.honors && item.honors.length > 0 && (
                <BulletList label="HONORS & RECOGNITION" items={item.honors} />
              )}
            </div>
          </li>
        ))}
      </ol>
    </SectionPanel>
  );
}
