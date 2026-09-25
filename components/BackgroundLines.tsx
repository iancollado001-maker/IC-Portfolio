// Faint sweeping curves behind the content, as in the reference background. Purely decorative.
export default function BackgroundLines() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full lg:left-sidebar lg:w-[calc(100%-17.5rem)]"
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
      fill="none"
    >
      <path d="M-40 520 C 240 380, 420 120, 560 -40" stroke="var(--line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <path d="M380 -20 C 520 260, 760 420, 1240 300" stroke="var(--line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <path d="M620 -30 C 700 180, 820 260, 1000 820" stroke="var(--line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <path d="M-30 760 C 300 640, 520 700, 760 840" stroke="var(--line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <path d="M1000 -20 C 1080 200, 1160 320, 1240 420" stroke="var(--line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
