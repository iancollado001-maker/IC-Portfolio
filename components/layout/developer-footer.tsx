import { DEVELOPER_ATTRIBUTION as dev } from "@/lib/attribution";

export function DeveloperFooter() {
  return (
    <footer
      aria-label="Developer attribution"
      className="w-full select-none border-t border-border py-3 text-center font-mono text-[11px] text-muted"
    >
      {dev.name},{" "}
      <a href={`tel:${dev.phone}`} className="hover:underline">
        {dev.phone}
      </a>
      ,{" "}
      <a href={`mailto:${dev.email}`} className="hover:underline">
        {dev.email}
      </a>
    </footer>
  );
}
