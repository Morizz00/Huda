import type { ReactNode } from "react";
import { SplitText } from "@/components/bits/SplitText";
import { IslamicStar } from "@/components/ui/IslamicStar";

export function PageHero({
  kicker,
  title,
  body,
  children,
}: {
  kicker?: string;
  title: string;
  body?: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden rounded-[1.6rem] border border-gold/25 bg-card/40 px-5 py-7 backdrop-blur-sm md:px-7 md:py-9">
      <div aria-hidden className="aurora-blob -left-10 -top-16 h-44 w-44 bg-aurora-a/45" />
      <div
        aria-hidden
        className="aurora-blob -bottom-20 right-0 h-48 w-48 bg-aurora-b/40"
        style={{ animationDelay: "-6s" }}
      />
      <IslamicStar
        size={200}
        className="animate-spin-slow pointer-events-none absolute -right-12 -top-12 text-gold/25"
      />
      <div className="relative">
        {kicker && <span className="chip">{kicker}</span>}
        <SplitText
          as="h1"
          text={title}
          className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl"
        />
        {body && <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{body}</p>}
        {children && <div className="mt-5 flex flex-wrap gap-2">{children}</div>}
      </div>
    </header>
  );
}
