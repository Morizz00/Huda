import type { ReactNode } from "react";

export function Page({
  children,
  width = "default",
}: {
  children: ReactNode;
  width?: "default" | "wide";
}) {
  const max = width === "wide" ? "max-w-2xl" : "max-w-md";
  return (
    <div className={`mx-auto flex w-full ${max} flex-col gap-6 px-5 py-6 md:py-8`}>
      {children}
    </div>
  );
}
