"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export function SplitText({
  text,
  className = "",
  as: Tag = "p",
  delay = 40,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const chars = ref.current.querySelectorAll("[data-char]");
      gsap.fromTo(
        chars,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: delay / 1000,
        },
      );
    },
    { scope: ref, dependencies: [text] },
  );

  return (
    <div ref={ref}>
      <Tag className={className}>
        {words.map((word, wi) => (
          <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
            {word.split("").map((char, ci) => (
              <span key={`${wi}-${ci}`} data-char className="inline-block">
                {char}
              </span>
            ))}
            {wi < words.length - 1 ? "\u00A0" : null}
          </span>
        ))}
      </Tag>
    </div>
  );
}
