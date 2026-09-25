import {
  Award,
  FolderOpen,
  GraduationCap,
  House,
  Layers,
  MessageCircle,
  UserRound,
  type LucideIcon,
} from "lucide-react";

// One icon per section id, shared by the sidebar, overview cards, and section panels
// so a section is recognisable by the same glyph everywhere.
export const sectionIcons: Record<string, LucideIcon> = {
  home: House,
  about: UserRound,
  skills: Layers,
  projects: FolderOpen,
  education: GraduationCap,
  certifications: Award,
  contact: MessageCircle,
};

export function sectionIdFromHref(href: string): string {
  return href.split("#")[1] ?? "home";
}
