import type { LucideIcon } from "lucide-react";

type Size = "sm" | "md";

const sizes: Record<Size, { box: string; icon: string }> = {
  sm: { box: "h-8 w-8 rounded-lg", icon: "h-4 w-4" },
  md: { box: "h-10 w-10 rounded-xl", icon: "h-5 w-5" },
};

// The orange square icon badge that heads every card in the reference design.
export default function IconTile({
  icon: Icon,
  size = "md",
}: {
  icon: LucideIcon;
  size?: Size;
}) {
  const s = sizes[size];
  return (
    <span
      aria-hidden
      className={`${s.box} flex shrink-0 items-center justify-center bg-accent text-white shadow-[inset_0_-2px_0_rgba(0,0,0,0.12),0_4px_10px_-4px_rgba(234,88,12,0.6)]`}
    >
      <Icon className={s.icon} strokeWidth={2.25} />
    </span>
  );
}
