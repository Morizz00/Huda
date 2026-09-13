import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Page } from "@/components/ui/Page";
import { EXPLORE_ITEMS } from "@/lib/explore";

export default function ExplorePage() {
  return (
    <Page>
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Explore</h1>
        <p className="mt-1 text-sm text-muted">Knowledge and worship tools, without a social feed.</p>
      </header>
      <div className="grid grid-cols-1 gap-3">
        {EXPLORE_ITEMS.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="transition-colors hover:border-accent/40">
              <p className="font-medium">{item.title}</p>
              <p className="mt-1 text-sm text-muted">{item.body}</p>
            </Card>
          </Link>
        ))}
      </div>
    </Page>
  );
}
