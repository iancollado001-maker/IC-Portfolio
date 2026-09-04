import { skillCategories } from "@/lib/site-config";

export default function Skills() {
  return (
    <section id="skills" className="border-b border-border py-24">
      <div className="mx-auto max-w-content px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Technical Skills
          </h2>
          <span className="font-mono text-[11px] text-muted">
            {skillCategories.reduce((n, c) => n + c.skills.length, 0)} skills across{" "}
            {skillCategories.length} categories
          </span>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="font-mono text-[11px] tracking-wide text-muted">
                {category.title.toUpperCase()}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-foreground/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}