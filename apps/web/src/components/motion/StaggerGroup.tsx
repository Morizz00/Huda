"use client";

import { useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/**
 * Animates each direct child in as it enters the viewport. Children already
 * on screen cascade in with a short stagger; the rest reveal on scroll.
 */
export function StaggerGroup({
  children,
  className = "",
  stagger = 0.09,
  y = 26,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || prefersReducedMotion()) return;
      Array.from(root.children).forEach((child, i) => {
        gsap.from(child, {
          y,
          opacity: 0,
          duration: 0.85,
          delay: Math.min(i, 4) * stagger,
          ease: "power3.out",
          scrollTrigger: { trigger: child, start: "top 94%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
