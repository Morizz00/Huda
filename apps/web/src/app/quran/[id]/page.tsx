import Link from "next/link";
import { RememberSurah } from "@/components/quran/ContinueReading";
import { VerseBlock } from "@/components/quran/VerseBlock";
import { EmptyState } from "@/components/ui/EmptyState";
import { IconArrowLeft } from "@/components/ui/Icon";
import { Page } from "@/components/ui/Page";
import { getSurahDetail } from "@/lib/api";

export default async function SurahPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const surahId = Number(id);
  if (!Number.isInteger(surahId) || surahId < 1) {
    return (
      <Page width="wide">
        <EmptyState title="Unknown surah" body="That address is not a valid surah number." />
      </Page>
    );
  }

  const surah = await getSurahDetail(surahId);

  if (!surah) {
    return (
      <Page width="wide">
        <Link href="/quran" className="inline-flex items-center gap-1 text-sm text-muted">
          <IconArrowLeft size={16} /> All surahs
        </Link>
        <EmptyState
          title="Surah unavailable"
          body="The API did not return this surah. Confirm the Go server is running and the corpus is seeded."
        />
      </Page>
    );
  }

  return (
    <Page width="wide">
      <RememberSurah id={surah.id} name={surah.name_transliteration} />
      <header className="flex flex-col items-center gap-1 text-center">
        <Link href="/quran" className="inline-flex items-center gap-1 self-start text-sm text-muted">
          <IconArrowLeft size={16} /> All surahs
        </Link>
        <p dir="rtl" lang="ar" className="mt-4 font-amiri text-5xl text-gold">
          {surah.name_arabic}
        </p>
        <h1 className="font-display text-3xl">{surah.name_transliteration}</h1>
        <p className="text-sm text-muted">
          {surah.name_translation} · {surah.revelation_place} · {surah.ayah_count} ayahs
        </p>
      </header>

      <div className="flex flex-col gap-4">
        {surah.ayahs.map((ayah) => (
          <VerseBlock
            key={ayah.id}
            ayah={ayah}
            surahId={surah.id}
            href={`/quran/${surah.id}/${ayah.ayah_number}`}
          />
        ))}
      </div>
    </Page>
  );
}
