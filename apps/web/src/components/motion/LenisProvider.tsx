"use client";

import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

function ScrollBridge() {
  const bar = useRef<HTMLDivElement>(null);

  useLenis((lenis) => {
    ScrollTrigger.update();
    if (bar.current) bar.current.style.transform = `scaleX(${lenis.progress || 0})`;
  });

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px]">
      <div
        ref={bar}
        className="h-full origin-left bg-gradient-to-r from-aurora-a via-gold to-aurora-b"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  // One clock for everything: GSAP's ticker drives Lenis, and Lenis feeds ScrollTrigger.
  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.09,
        duration: 1.15,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      <ScrollBridge />
      {children}
    </ReactLenis>
  );
}
