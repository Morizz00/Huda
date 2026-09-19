import { EmptyState } from "@/components/ui/EmptyState";
import { Page } from "@/components/ui/Page";

export function PlaceholderPage({
  title,
  kicker,
  body,
}: {
  title: string;
  kicker?: string;
  body: string;
}) {
  return (
    <Page>
      <header>
        {kicker && (
          <p className="text-xs uppercase tracking-[0.22em] text-gold">{kicker}</p>
        )}
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">{title}</h1>
        <div className="ornament-line mt-4" />
      </header>
      <EmptyState title="Sourced content is not published yet" body={body} />
    </Page>
  );
}
