"use client";

import { useEffect, useState } from "react";
import { availability } from "@/lib/site-config";

const terminalLines = [
  { prompt: "ian@dev", cmd: "whoami" },
  { output: "Ian L. Collado — Software Developer" },
  { prompt: "ian@dev", cmd: "cat focus.txt" },
  { output: "web · desktop · mobile · IT support" },
  { prompt: "ian@dev", cmd: "./build --status" },
  { output: availability.isAvailable ? availability.label : availability.unavailableLabel },
];

// Self-typing terminal. Always dark, like the screenshot windows in the reference cards.
export default function TerminalWindow({ className = "" }: { className?: string }) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= terminalLines.length) return;
    const delay = terminalLines[visibleLines]?.cmd ? 550 : 320;
    const t = setTimeout(() => setVisibleLines((v) => v + 1), delay);
    return () => clearTimeout(t);
  }, [visibleLines]);

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f1b3d] text-[#e6e9f2] shadow-soft ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#f97316]" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
        <span className="ml-3 font-mono text-[11px] text-[#aab3cc]">
          ian@dev — zsh
        </span>
      </div>
      <div className="thin-scroll min-h-[13rem] flex-1 overflow-y-auto px-4 py-4 font-mono text-[12.5px] leading-relaxed">
        {terminalLines.slice(0, visibleLines).map((line, i) =>
          line.cmd ? (
            <div key={i} className="flex flex-wrap gap-x-2">
              <span className="text-[#fdba74]">{line.prompt} $</span>
              <span>{line.cmd}</span>
            </div>
          ) : (
            <div key={i} className="mb-3 text-[#aab3cc]">
              {line.output}
            </div>
          )
        )}
        {visibleLines < terminalLines.length && (
          <span className="inline-block h-3.5 w-2 animate-pulse bg-[#e6e9f2] align-middle" />
        )}
      </div>
    </div>
  );
}
