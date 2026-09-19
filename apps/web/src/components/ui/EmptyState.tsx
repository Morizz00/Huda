import type { ReactNode } from "react";
import { Button } from "./Button";

export function EmptyState({
  title,
  body,
  actionLabel,
  actionHref,
  children,
}: {
  title: string;
  body: string;
  actionLabel?: string;
  actionHref?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-[1.25rem] border border-dashed border-gold/35 bg-card/80 px-5 py-8">
      <p className="font-display text-xl">{title}</p>
      <p className="max-w-md text-sm leading-relaxed text-muted">{body}</p>
      {actionHref && actionLabel && (
        <Button href={actionHref} variant="secondary">
          {actionLabel}
        </Button>
      )}
      {children}
    </div>
  );
}
