"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

export function CountUp({
  value,
  suffix = "",
  duration = 1.4,
  className = "",
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const state = { v: 0 };
      el.textContent = `0${suffix}`;
      gsap.to(state, {
        v: value,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `${Math.round(state.v)}${suffix}`;
        },
        scrollTrigger: { trigger: el, start: "top 96%", once: true },
      });
    },
    { dependencies: [value, suffix], scope: ref },
  );

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value}
      {suffix}
    </span>
  );
}
