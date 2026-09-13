import { VerseBlock } from "@/components/quran/VerseBlock";
import { EmptyState } from "@/components/ui/EmptyState";
import { Page } from "@/components/ui/Page";
import { searchAyahs } from "@/lib/api";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results = query ? await searchAyahs(query) : [];

  return (
    <Page width="wide">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Search</h1>
        <p className="mt-1 text-sm text-muted">Arabic and transliteration in the seeded corpus.</p>
      </header>

      <form action="/search" className="flex gap-2">
        <input
          name="q"
          defaultValue={query}
          placeholder="Search ayahs…"
          className="w-full rounded-xl border border-stroke bg-card px-4 py-2.5 text-sm"
        />
        <button
          type="submit"
          className="rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-accent-fg"
        >
          Search
        </button>
      </form>

      {!query && (
        <EmptyState
          title="Look up a word"
          body="Try an Arabic particle from Al-Fatiha when the API is running, such as الله."
        />
      )}

      {query && results.length === 0 && (
        <EmptyState
          title="No matches"
          body="Nothing in the current corpus matched that query. Full-mushaf search arrives with the canonical import."
        />
      )}

      <div className="flex flex-col gap-4">
        {results.map((ayah) => (
          <VerseBlock
            key={ayah.id}
            ayah={ayah}
            surahId={ayah.surah_id}
            href={`/quran/${ayah.surah_id}/${ayah.ayah_number}`}
          />
        ))}
      </div>
    </Page>
  );
}
