"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[80vh] items-center px-4 py-12 sm:px-8 lg:px-10">
      <div className="glow-panel mx-auto w-full max-w-xl rounded-[1.75rem] p-8 text-center sm:p-12">
        <p className="font-mono text-[11px] tracking-wide text-accent-text">SOMETHING WENT WRONG</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          This page failed to load
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Try again. If it keeps happening, refresh the page.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
        >
          <RotateCcw className="h-4 w-4" />
          Try again
        </button>
      </div>
    </main>
  );
}
