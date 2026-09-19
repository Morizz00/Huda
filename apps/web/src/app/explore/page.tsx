import Link from "next/link";
import { SplitText } from "@/components/bits/SplitText";
import { SpotlightCard } from "@/components/bits/SpotlightCard";
import { Page } from "@/components/ui/Page";
import { EXPLORE_ITEMS } from "@/lib/explore";

export default function ExplorePage() {
  return (
    <Page>
      <header>
        <SplitText
          as="h1"
          text="Explore"
          className="font-display text-4xl font-semibold tracking-tight"
        />
        <p className="mt-2 text-sm text-muted">Knowledge and worship tools, without a social feed.</p>
        <div className="ornament-line mt-4" />
      </header>
      <div className="grid grid-cols-1 gap-3">
        {EXPLORE_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} className="focus-ring block rounded-[1.25rem]">
            <SpotlightCard>
              <p className="font-display text-xl">{item.title}</p>
              <p className="mt-1 text-sm text-muted">{item.body}</p>
            </SpotlightCard>
          </Link>
        ))}
      </div>
    </Page>
  );
}
