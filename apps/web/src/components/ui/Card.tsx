import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-stroke bg-card ${padded ? "p-4" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
