import { developerProfile } from "@/lib/site-config";

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
    <section id="about" className="border-b border-border py-24">
      <div className="mx-auto max-w-content px-6">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              About
            </h2>
            <p className="mt-4 max-w-sm text-balance leading-relaxed text-muted">
              A Computer Science graduate who learns by building — and by
              keeping systems running when things break.
            </p>

            <dl className="mt-8 rounded-2xl border border-border bg-card p-6">
              <div className="mb-3 font-mono text-[11px] tracking-wide text-muted">
                DEVELOPER PROFILE
              </div>
              <div className="space-y-2.5 text-sm">
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
              </div>
            </dl>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {focusAreas.map((area) => (
              <div
                key={area.title}
                className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/40"
              >
                <h3 className="font-display text-base font-semibold">
                  {area.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {area.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
