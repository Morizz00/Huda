import Link from "next/link";
import { SplitText } from "@/components/bits/SplitText";
import { SurahRow } from "@/components/quran/SurahRow";
import { EmptyState } from "@/components/ui/EmptyState";
import { IconSearch } from "@/components/ui/Icon";
import { Page } from "@/components/ui/Page";
import { listSurahs } from "@/lib/api";

export default async function QuranPage() {
  const surahs = await listSurahs();

  return (
    <Page>
      <header className="flex items-end justify-between gap-3">
        <div>
          <SplitText
            as="h1"
            text="Quran"
            className="font-display text-4xl font-semibold tracking-tight"
          />
          <p className="mt-1 text-sm text-muted">
            {surahs.length ? `${surahs.length} surah${surahs.length === 1 ? "" : "s"}` : "Corpus not loaded yet"}
          </p>
        </div>
        <Link
          href="/search"
          className="focus-ring flex min-h-11 items-center gap-2 rounded-full border border-gold/30 bg-soft px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <IconSearch size={16} />
          Search
        </Link>
      </header>

      {surahs.length === 0 ? (
        <EmptyState
          title="No surahs loaded"
          body="The reader needs the API on port 8080 and a seeded database. Until then, prayer, Qibla, dhikr, and zakat still work on this device."
        />
      ) : (
        <div className="surface overflow-hidden">
          <ul className="divide-y divide-stroke">
            {surahs.map((surah) => (
              <li key={surah.id}>
                <SurahRow surah={surah} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </Page>
  );
}
