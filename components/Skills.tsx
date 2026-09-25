import SectionPanel from "./ui/SectionPanel";
import { skillCategories, skillsSummary } from "@/lib/site-config";
import { sectionIcons } from "@/lib/section-icons";

export default function Skills() {
  return (
    <SectionPanel
      id="skills"
      icon={sectionIcons.skills}
      title="Technical Skills"
      description={skillsSummary}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {skillCategories.map((category) => (
          <div
            key={category.title}
            className="rounded-2xl border border-border bg-card p-6 shadow-soft"
          >
            <h3 className="font-mono text-[11px] tracking-wide text-accent-text">
              {category.title.toUpperCase()}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border bg-panel px-3 py-1.5 text-xs font-medium transition-colors hover:border-accent"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionPanel>
  );
}
