import Link from "next/link";
import { SpotlightCard } from "@/components/bits/SpotlightCard";
import { IconArrowRight } from "@/components/ui/Icon";

export type CollectionItem = {
  title: string;
  body?: string;
  href?: string;
  tag?: string;
};

/** A numbered grid of collections. Used for sets whose sourced content is still being published. */
export function CollectionGrid({
  items,
  columns = 2,
}: {
  items: readonly CollectionItem[];
  columns?: 1 | 2;
}) {
  return (
    <div className={`grid gap-3 ${columns === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
      {items.map((item, i) => {
        const inner = (
          <SpotlightCard className="h-full">
            <div className="flex items-start justify-between gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/35 font-display text-lg text-gold">
                {i + 1}
              </span>
              {item.href && <IconArrowRight size={16} className="mt-1 text-gold/70" />}
            </div>
            <p className="mt-3 font-display text-xl leading-tight">{item.title}</p>
            {item.body && <p className="mt-1 text-sm leading-snug text-muted">{item.body}</p>}
            {item.tag && <span className="chip mt-3">{item.tag}</span>}
          </SpotlightCard>
        );
        return item.href ? (
          <Link key={item.title} href={item.href} className="focus-ring block rounded-[1.25rem]">
            {inner}
          </Link>
        ) : (
          <div key={item.title}>{inner}</div>
        );
      })}
    </div>
  );
}
