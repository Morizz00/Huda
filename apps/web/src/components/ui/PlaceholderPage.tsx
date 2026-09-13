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
        {kicker && <p className="text-sm text-muted">{kicker}</p>}
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">{title}</h1>
      </header>
      <EmptyState title="Sourced content is not published yet" body={body} />
    </Page>
  );
}
