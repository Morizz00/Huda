"use client";

import type { ReactNode } from "react";
import { VantaFog } from "@/components/motion/VantaFog";
import { IslamicStar } from "@/components/ui/IslamicStar";

export function HeroShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[1.7rem] border border-gold/35 bg-hero text-hero-fg shadow-[0_30px_70px_-34px_rgba(5,20,17,0.9)]">
      {/* CSS gradient shows on mobile / reduced-motion, WebGL fog layers over it on desktop. */}
      <div aria-hidden className="hero-glow absolute inset-0" />
      <VantaFog palette="hero" speed={0.7} className="opacity-70 mix-blend-screen" />
      <div aria-hidden className="geom-veil absolute inset-0 opacity-30" />
      <IslamicStar
        size={240}
        className="animate-spin-slow pointer-events-none absolute -right-16 -top-16 text-hero-fg/15"
      />
      <div className="relative z-10 px-5 py-6 md:px-7 md:py-8">{children}</div>
    </div>
  );
}
