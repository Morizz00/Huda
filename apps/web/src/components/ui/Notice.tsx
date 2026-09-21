import type { ReactNode } from "react";

export function Notice({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-gold/25 bg-gold/10 px-4 py-3.5 text-sm">
      <span
        aria-hidden
        className="animate-pulse-glow mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold"
      />
      <div>
        <p className="font-medium">{title}</p>
        <div className="mt-0.5 leading-relaxed text-muted">{children}</div>
      </div>
    </div>
  );
}
