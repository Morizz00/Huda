"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Tones = { highlight: number; midtone: number; lowlight: number; base: number };

const PALETTES = {
  // Page-wide backdrop: pale mint mist on parchment, deep emerald mist at night.
  page: {
    light: { highlight: 0xbfe6d3, midtone: 0xe9dfc2, lowlight: 0xf3ead2, base: 0xf6edd8 },
    dark: { highlight: 0x2f8f78, midtone: 0x0c3a32, lowlight: 0x06100e, base: 0x040a09 },
  },
  // Hero card is dark in both themes: emerald depths with a gold ember.
  hero: {
    light: { highlight: 0xc9a45c, midtone: 0x0d4a3e, lowlight: 0x061614, base: 0x040d0c },
    dark: { highlight: 0xc9a45c, midtone: 0x0d4a3e, lowlight: 0x061614, base: 0x040d0c },
  },
} satisfies Record<string, { light: Tones; dark: Tones }>;

export type FogPalette = keyof typeof PALETTES;

function currentTheme(): "light" | "dark" {
  const forced = document.documentElement.getAttribute("data-theme");
  if (forced === "light" || forced === "dark") return forced;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function VantaFog({
  className = "",
  palette = "page",
  speed = 0.45,
  interactive = false,
}: {
  className?: string;
  palette?: FogPalette;
  speed?: number;
  interactive?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    let effect: { destroy: () => void } | null = null;
    let cancelled = false;

    const mount = () => {
      effect?.destroy();
      effect = null;
      void import("vanta/dist/vanta.fog.min").then((mod) => {
        if (cancelled || !ref.current) return;
        const tones = PALETTES[palette][currentTheme()];
        effect = mod.default({
          el: ref.current,
          THREE,
          mouseControls: interactive,
          touchControls: false,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          highlightColor: tones.highlight,
          midtoneColor: tones.midtone,
          lowlightColor: tones.lowlight,
          baseColor: tones.base,
          blurFactor: 0.6,
          speed,
          zoom: 1.1,
        });
      });
    };

    mount();

    // Re-tint when the theme is toggled or the OS scheme flips.
    const observer = new MutationObserver(mount);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", mount);

    return () => {
      cancelled = true;
      observer.disconnect();
      scheme.removeEventListener("change", mount);
      effect?.destroy();
    };
  }, [palette, speed, interactive]);

  return <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 ${className}`} />;
}
