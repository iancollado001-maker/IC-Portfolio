import Image from "next/image";
import SectionPanel from "./ui/SectionPanel";
import { developerProfile, personal, sectionIntros } from "@/lib/site-config";
import { sectionIcons } from "@/lib/section-icons";

const focusAreas = [
  {
    title: "Software Development",
    detail: "Building applications end-to-end, from data model to interface.",
  },
  {
    title: "Web Development",
    detail: "Server-rendered and client-side web applications.",
  },
  {
    title: "Desktop Applications",
    detail: "Windows-targeted tools built with C# and .NET technologies.",
  },
  {
    title: "Mobile Applications",
    detail: "Cross-platform apps using Xamarin.",
  },
  {
    title: "IT Support",
    detail: "Hands-on hardware, software, and network troubleshooting.",
  },
  {
    title: "Problem Solving",
    detail: "Translating real-world needs into working technical solutions.",
  },
];

export default function About() {
  return (
    <SectionPanel
      id="about"
      icon={sectionIcons.about}
      title="About"
      description={sectionIntros.about}
    >
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <div className="relative aspect-[4/3] w-full bg-panel">
            <Image
              src={personal.photo}
              alt={personal.photoAlt}
              fill
              sizes="(min-width: 1024px) 35vw, 100vw"
              className="object-cover object-[50%_22%]"
            />
          </div>
          <div className="p-6">
            <div className="mb-3 font-mono text-[11px] tracking-wide text-accent-text">
              DEVELOPER PROFILE
            </div>
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Name</dt>
                <dd className="text-right font-medium">{developerProfile.name}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Degree</dt>
                <dd className="text-right font-medium">{developerProfile.degree}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Location</dt>
                <dd className="text-right font-medium">{developerProfile.location}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Focus</dt>
                <dd className="text-right font-medium">{developerProfile.focus}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="grid content-start gap-4 sm:grid-cols-2">
          {focusAreas.map((area, i) => (
            <div
              key={area.title}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft transition-colors hover:border-foreground/30"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-base font-bold">{area.title}</h3>
                <span className="font-mono text-[11px] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{area.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionPanel>
  );
}
