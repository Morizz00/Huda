import Link from "next/link";
import { notFound } from "next/navigation";
import { getSurahDetail } from "@/lib/api";

export default async function SurahPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const surahId = Number(id);
  if (!Number.isInteger(surahId)) notFound();

  const surah = await getSurahDetail(surahId);
  if (!surah) notFound();

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-6 py-10">
      <header className="flex flex-col items-center gap-1 text-center">
        <Link href="/quran" className="self-start text-sm text-neutral-500">
          ← All surahs
        </Link>
        <p dir="rtl" className="mt-2 text-3xl font-semibold">
          {surah.name_arabic}
        </p>
        <h1 className="text-xl font-semibold">{surah.name_transliteration}</h1>
        <p className="text-sm text-neutral-500">
          {surah.name_translation} · {surah.revelation_place} · {surah.ayah_count} ayahs
        </p>
      </header>

      <div className="flex flex-col gap-6">
        {surah.ayahs.map((ayah) => (
          <div key={ayah.id} className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
            <div className="mb-2 text-xs text-neutral-400">{surah.id}:{ayah.ayah_number}</div>
            <p dir="rtl" className="mb-2 text-right text-2xl leading-loose">
              {ayah.text_arabic}
            </p>
            {ayah.text_transliteration && (
              <p className="text-sm italic text-neutral-500">{ayah.text_transliteration}</p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
