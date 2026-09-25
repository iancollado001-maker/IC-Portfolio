"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { availability, nav, personal } from "@/lib/site-config";
import { sectionIcons, sectionIdFromHref } from "@/lib/section-icons";

const sectionIds = nav.map((item) => sectionIdFromHref(item.href));

// Highlights the nav item for whichever section currently crosses the middle of the viewport.
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState("home");

  useEffect(() => {
    if (!enabled) return;
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

function ProfilePhoto({ size }: { size: "sm" | "lg" }) {
  const box = size === "lg" ? "h-28 w-28" : "h-9 w-9";
  return (
    <span className={`relative inline-flex ${box} shrink-0`}>
      {size === "lg" && (
        <span
          aria-hidden
          className="absolute -inset-3 rounded-full bg-accent/25 blur-2xl"
        />
      )}
      <Image
        src={personal.photo}
        alt={size === "lg" ? personal.photoAlt : ""}
        fill
        sizes={size === "lg" ? "112px" : "36px"}
        priority={size === "lg"}
        className="rounded-full border-2 border-card object-cover object-[50%_20%] shadow-soft"
      />
      {size === "lg" && availability.isAvailable && (
        <span
          title={availability.label}
          className="absolute bottom-1.5 right-1.5 h-4 w-4 rounded-full border-[3px] border-panel bg-success"
        >
          <span className="sr-only">{availability.label}</span>
        </span>
      )}
    </span>
  );
}

const iconButton =
  "flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-soft transition-colors hover:bg-foreground hover:text-background";

function SidebarBody({
  active,
  onNavigate,
}: {
  active: string | null;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex min-h-full flex-col px-5 pb-6 pt-10">
      <div className="flex flex-col items-center text-center">
        <ProfilePhoto size="lg" />
        <p className="mt-5 font-display text-xl font-bold [word-spacing:0.1em]">
          {personal.name}
        </p>
        <p className="mt-0.5 text-sm text-muted">@{personal.githubUsername}</p>
        <p className="mt-1 text-xs text-muted">{personal.role}</p>

        <div className="mt-5 flex items-center gap-2.5">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className={iconButton}
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${personal.email}`}
            aria-label={`Email ${personal.email}`}
            className={iconButton}
          >
            <Mail className="h-4 w-4" />
          </a>
          {personal.linkedin && (
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className={iconButton}
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          <ThemeToggle />
        </div>
      </div>

      <hr className="my-6 border-border" />

      <nav aria-label="Main">
        <ul className="space-y-1">
          {nav.map((item) => {
            const id = sectionIdFromHref(item.href);
            const Icon = sectionIcons[id];
            const isActive = active === id;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={isActive ? "location" : undefined}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] transition-colors ${
                    isActive
                      ? "bg-foreground/[0.07] font-semibold text-foreground"
                      : "text-muted hover:bg-foreground/[0.04] hover:text-foreground"
                  }`}
                >
                  {Icon && (
                    <Icon
                      className={`h-[18px] w-[18px] ${isActive ? "text-accent-text" : ""}`}
                    />
                  )}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <a
        href={personal.resumePath}
        download
        className="mt-6 flex items-center justify-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
      >
        <Download className="h-4 w-4" />
        Download Resume
      </a>

      <div className="mt-auto pt-8">
        <hr className="mb-4 border-border" />
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {personal.name}
        </p>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const active = useActiveSection(pathname === "/");
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    drawerRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  // A drawer left open while resizing to desktop would keep the page scroll-locked.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      {/* Desktop: fixed left column */}
      <aside className="thin-scroll fixed inset-y-0 left-0 z-40 hidden w-sidebar overflow-y-auto border-r border-border bg-panel lg:block">
        <SidebarBody active={active} />
      </aside>

      {/* Tablet / mobile: slim top bar + slide-in drawer */}
      <header className="glass-surface sticky top-0 z-40 flex items-center justify-between border-b border-border px-4 py-3 sm:px-8 lg:hidden">
        <Link href="/#home" className="flex items-center gap-2.5" aria-label={`${personal.name} — home`}>
          <ProfilePhoto size="sm" />
          <span className="font-display text-sm font-bold tracking-tight">
            {personal.name}
          </span>
        </Link>
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-drawer"
          className={iconButton}
        >
          <Menu className="h-4 w-4" />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.button
              type="button"
              aria-label="Close menu"
              tabIndex={-1}
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              id="mobile-drawer"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="thin-scroll absolute inset-y-0 left-0 w-[min(20rem,86vw)] overflow-y-auto bg-panel shadow-2xl"
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className={`${iconButton} absolute right-4 top-4 z-10`}
              >
                <X className="h-4 w-4" />
              </button>
              <SidebarBody active={active} onNavigate={() => setOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
