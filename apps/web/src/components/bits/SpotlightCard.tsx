"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(201, 164, 92, 0.18)",
}: {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(0.85)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-[1.25rem] border border-gold/30 bg-card/90 p-4 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(420px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 42%)`,
        }}
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
