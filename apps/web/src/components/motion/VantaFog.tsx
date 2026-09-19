"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function VantaFog({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    let effect: { destroy: () => void } | null = null;
    let cancelled = false;

    void import("vanta/dist/vanta.fog.min").then((mod) => {
      if (cancelled || !ref.current) return;
      effect = mod.default({
        el: ref.current,
        THREE,
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        highlightColor: 0x3d9a82,
        midtoneColor: 0x0d3a32,
        lowlightColor: 0x071210,
        baseColor: 0x050c0b,
        blurFactor: 0.55,
        speed: 0.45,
        zoom: 1.05,
      });
    });

    return () => {
      cancelled = true;
      effect?.destroy();
    };
  }, []);

  return <div ref={ref} className={`pointer-events-none absolute inset-0 ${className}`} />;
}
