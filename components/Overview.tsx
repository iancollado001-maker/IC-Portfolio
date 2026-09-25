import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Blocks,
  Code2,
  Download,
  Github,
  Linkedin,
  Mail,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import IconTile from "./ui/IconTile";
import TerminalWindow from "./TerminalWindow";
import {
  awards,
  education,
  personal,
  projects,
  sectionIntros,
  skillCategories,
  skillsSummary,
  totalSkillCount,
} from "@/lib/site-config";
import { sectionIcons } from "@/lib/section-icons";

const pad = (n: number) => String(n).padStart(2, "0");

// The first three categories are languages, frameworks, and tools — the "daily drivers".
const toolIcons: LucideIcon[] = [Code2, Blocks, Wrench];
const tools = skillCategories
  .slice(0, toolIcons.length)
  .flatMap((category, i) => category.skills.map((name) => ({ name, Icon: toolIcons[i] })));

function ToolsStrip() {
  const renderItems = (hidden: boolean) =>
    tools.map(({ name, Icon }) => (
      <li
        key={`${hidden ? "b" : "a"}-${name}`}
        aria-hidden={hidden || undefined}
        className={`flex shrink-0 items-center gap-2 border-r border-border px-6 text-sm font-medium last:border-r-0 motion-reduce:border-r-0 motion-reduce:px-3 motion-reduce:py-1 ${
          hidden ? "motion-reduce:hidden" : ""
        }`}
      >
        <Icon className="h-4 w-4 text-accent-text" />
        {name}
      </li>
    ));

  return (
    <div className="glow-panel flex flex-col gap-4 rounded-[1.75rem] p-4 sm:p-5 md:flex-row md:items-center">
      <div className="shrink-0 md:border-r md:border-border md:pr-6">
        <div className="font-mono text-[11px] font-medium tracking-wide text-accent-text">
          TECH STACK
        </div>
        <p className="font-display text-lg font-bold tracking-tight">Tools I work with</p>
      </div>
      {/* With reduced motion the strip stops scrolling and wraps, so every tool stays visible. */}
      <div className="marquee marquee-mask min-w-0 flex-1 overflow-hidden rounded-2xl border border-border bg-card py-3.5 motion-reduce:[mask-image:none]">
        <ul
          className="marquee-track flex w-max motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:px-3"
          aria-label="Tools I work with"
        >
          {renderItems(false)}
          {renderItems(true)}
        </ul>
      </div>
    </div>
  );
}

function BentoCard({
  id,
  title,
  description,
  className = "",
  children,
}: {
  id: string;
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const Icon = sectionIcons[id];
  return (
    <article
      className={`flex min-w-0 flex-col rounded-3xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-[0_12px_32px_-16px_rgba(15,27,61,0.28)] sm:p-6 ${className}`}
    >
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <IconTile icon={Icon} />
          <h3 className="font-display text-xl font-bold tracking-tight">
            <Link href={`/#${id}`} className="hover:underline">
              {title}
            </Link>
          </h3>
        </div>
        <Link
          href={`/#${id}`}
          aria-label={`Go to ${title}`}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-foreground hover:text-background"
        >
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </header>
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
      )}
      <div className="mt-5 flex flex-1 flex-col">{children}</div>
    </article>
  );
}

function ProjectsCard() {
  const withImages = projects.filter((p) => p.image);
  return (
    <BentoCard
      id="projects"
      title="Projects"
      description={sectionIntros.projects}
      className="md:col-span-12 xl:col-span-6"
    >
      <div className="grid flex-1 gap-5 sm:grid-cols-[1fr_1.1fr] sm:items-center">
        <ul className="space-y-2">
          {projects.map((p, i) => (
            <li key={p.slug}>
              <Link
                href="/#projects"
                className="flex items-center gap-3 rounded-xl border border-border bg-panel px-3 py-2.5 transition-colors hover:border-foreground/30"
              >
                <span className="font-mono text-[11px] text-muted">{pad(i + 1)}</span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">{p.title}</span>
                  <span className="block truncate text-xs text-muted">{p.badge}</span>
                </span>
                <span
                  className={`ml-auto h-2 w-2 shrink-0 rounded-full ${p.liveUrl ? "bg-success" : "bg-accent"}`}
                  title={p.liveUrl ? "Live demo available" : "Source on GitHub"}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Stacked screenshot windows, fanned like the reference's project previews */}
        <div className="group relative mx-auto h-72 w-full max-w-sm" aria-hidden>
          {withImages.slice(0, 3).map((p, i) => (
            <div
              key={p.slug}
              style={{ zIndex: i + 1 }}
              className={`absolute w-[80%] overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-transform duration-500 ${
                [
                  "left-0 top-0 group-hover:-translate-y-1",
                  "left-[10%] top-[22%] group-hover:translate-x-1",
                  "left-[20%] top-[44%] group-hover:translate-x-2 group-hover:translate-y-1",
                ][i]
              }`}
            >
              <div className="flex items-center gap-1 border-b border-border bg-panel px-2.5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted/40" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted/40" />
              </div>
              <div className="relative aspect-[21/10] w-full">
                <Image
                  src={p.image as string}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 20vw, (min-width: 640px) 40vw, 90vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}

function AboutCard() {
  return (
    <BentoCard
      id="about"
      title="About"
      description={sectionIntros.about}
      className="md:col-span-6 xl:col-span-3"
    >
      {/* Fanned photo cards, as in the reference About card */}
      <div className="relative mx-auto mt-auto h-40 w-32" aria-hidden>
        {[-10, -4, 0].map((deg, i) => (
          <div
            key={deg}
            style={{ transform: `rotate(${deg}deg) translateX(${(i - 2) * 10}px)` }}
            className="absolute inset-0 overflow-hidden rounded-2xl border-4 border-card bg-panel shadow-soft"
          >
            {i === 2 && (
              <Image
                src={personal.photo}
                alt=""
                fill
                sizes="128px"
                className="object-cover object-[50%_20%]"
              />
            )}
          </div>
        ))}
      </div>
    </BentoCard>
  );
}

function SkillsCard() {
  const preview = skillCategories.flatMap((c) => c.skills).slice(0, 8);
  return (
    <BentoCard
      id="skills"
      title="Skills"
      description={skillsSummary}
      className="md:col-span-6 xl:col-span-3"
    >
      <ul className="flex flex-wrap gap-2">
        {preview.map((skill) => (
          <li
            key={skill}
            className="flex items-center gap-1.5 rounded-full border border-border bg-panel px-2.5 py-1 text-xs font-medium"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            {skill}
          </li>
        ))}
        <li>
          <Link
            href="/#skills"
            className="flex items-center rounded-full border border-dashed border-border px-2.5 py-1 text-xs font-medium text-accent-text hover:border-accent"
          >
            +{totalSkillCount - preview.length} more
          </Link>
        </li>
      </ul>
    </BentoCard>
  );
}

function CertificationsCard() {
  return (
    <BentoCard
      id="certifications"
      title="Certifications"
      className="md:col-span-6 xl:col-span-3"
    >
      <div className="flex flex-col items-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-border bg-panel shadow-soft">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-accent/50 bg-accent-soft">
            <sectionIcons.certifications className="h-7 w-7 text-accent-text" aria-hidden />
          </div>
        </div>
        <span className="-mt-3 flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {awards.length} Awards &amp; Recognitions
        </span>
      </div>
      <ul className="mt-5 space-y-2">
        {awards.map((award) => (
          <li key={award.title} className="flex gap-2.5 text-sm">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
            <span className="min-w-0">
              <span className="font-medium">{award.title}</span>
              {award.period && (
                <span className="block text-xs text-muted">{award.period}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}

function EducationCard() {
  const Icon = sectionIcons.education;
  return (
    <BentoCard id="education" title="Education" className="md:col-span-6 xl:col-span-3">
      <ol className="divide-y divide-border">
        {education.map((item, i) => (
          <li key={item.school} className="flex items-start gap-3 py-3 first:pt-0">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-text">
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold">{item.school}</span>
              <span className="block text-xs text-muted">{item.program}</span>
              <span className="mt-1 block font-mono text-[11px] text-accent-text">
                {item.period}
              </span>
            </span>
            <span className="font-mono text-[11px] text-muted">{pad(i + 1)}</span>
          </li>
        ))}
      </ol>
    </BentoCard>
  );
}

function ContactCard() {
  const channels = [
    { label: "Email", value: personal.email, href: `mailto:${personal.email}`, Icon: Mail },
    {
      label: "GitHub",
      value: `github.com/${personal.githubUsername}`,
      href: personal.github,
      Icon: Github,
      external: true,
    },
    ...(personal.linkedin
      ? [{ label: "LinkedIn", value: "LinkedIn", href: personal.linkedin, Icon: Linkedin, external: true }]
      : []),
  ];

  return (
    <BentoCard
      id="contact"
      title="Contact"
      description={sectionIntros.contact}
      className="md:col-span-12 xl:col-span-6"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {channels.map(({ label, value, href, Icon, external }) => (
          <a
            key={label}
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="flex min-w-0 items-center gap-3 rounded-2xl border border-border bg-panel p-4 transition-colors hover:border-foreground/30"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-text">
              <Icon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{label}</span>
              <span className="block truncate text-xs text-muted">{value}</span>
            </span>
          </a>
        ))}
        <a
          href={personal.resumePath}
          download
          className="flex min-w-0 items-center gap-3 rounded-2xl border border-border bg-panel p-4 transition-colors hover:border-foreground/30"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-text">
            <Download className="h-4 w-4" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold">Resume</span>
            <span className="block truncate text-xs text-muted">Download PDF</span>
          </span>
        </a>
        <Link
          href="/#contact"
          className="flex items-center justify-center gap-2 rounded-2xl bg-foreground p-4 text-sm font-semibold text-background transition-opacity hover:opacity-85"
        >
          Send a message
          <ArrowUpRight className="h-4 w-4 text-accent" />
        </Link>
      </div>
      <TerminalWindow className="mt-3 flex-1" />
    </BentoCard>
  );
}

export default function Overview() {
  return (
    <div className="space-y-5 px-4 py-4 sm:px-8 lg:px-10">
      <ToolsStrip />
      <div className="glow-panel rounded-[1.75rem] p-3 sm:p-5">
        <div className="grid gap-4 md:grid-cols-12">
          <ProjectsCard />
          <AboutCard />
          <SkillsCard />
          <CertificationsCard />
          <EducationCard />
          <ContactCard />
        </div>
      </div>
    </div>
  );
}
