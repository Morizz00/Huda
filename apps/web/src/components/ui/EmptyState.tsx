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
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-dashed border-stroke bg-card px-5 py-8">
      <p className="text-sm font-medium">{title}</p>
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
