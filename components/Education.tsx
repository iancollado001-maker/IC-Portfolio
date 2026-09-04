import { education } from "@/lib/site-config";

export default function Education() {
  return (
    <section id="education" className="border-b border-border py-24">
      <div className="mx-auto max-w-content px-6">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Education
        </h2>

        <div className="mt-10 space-y-8">
          {education.map((item) => (
            <div
              key={item.school}
              className="grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-[180px_1fr] sm:gap-10 sm:p-8"
            >
              <div className="font-mono text-[11px] text-muted">
                <div>{item.period}</div>
                <div className="mt-1">{item.location}</div>
              </div>

              <div>
                <h3 className="font-display text-xl font-semibold">
                  {item.school}
                </h3>
                <p className="mt-1 text-sm text-muted">{item.program}</p>

                {item.description && (
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                )}

                {item.highlights && item.highlights.length > 0 && (
                  <div className="mt-5">
                    <div className="font-mono text-[11px] tracking-wide text-muted">
                      HIGHLIGHTS
                    </div>
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                      {item.highlights.map((h) => (
                        <li key={h} className="flex gap-2.5">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.honors && item.honors.length > 0 && (
                  <div className="mt-5">
                    <div className="font-mono text-[11px] tracking-wide text-muted">
                      HONORS &amp; RECOGNITION
                    </div>
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                      {item.honors.map((h) => (
                        <li key={h} className="flex gap-2.5">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}