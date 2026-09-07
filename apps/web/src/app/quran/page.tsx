import Link from "next/link";
import { listSurahs } from "@/lib/api";

export default async function QuranPage() {
  const surahs = await listSurahs();

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-4 px-6 py-10">
      <header>
        <h1 className="text-2xl font-semibold">Quran</h1>
        <p className="text-sm text-neutral-500">{surahs.length} surah available</p>
      </header>

      <ul className="flex flex-col divide-y divide-neutral-200 rounded-xl border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
        {surahs.map((surah) => (
          <li key={surah.id}>
            <Link
              href={`/quran/${surah.id}`}
              className="flex items-center justify-between px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-900"
            >
              <span>
                <span className="mr-2 text-sm text-neutral-400">{surah.id}.</span>
                <span className="font-medium">{surah.name_transliteration}</span>
                <span className="ml-2 text-sm text-neutral-500">{surah.name_translation}</span>
              </span>
              <span dir="rtl" className="text-lg">
                {surah.name_arabic}
              </span>
            </Link>
          </li>
        ))}
        {surahs.length === 0 && (
          <li className="px-4 py-6 text-center text-sm text-neutral-500">
            No surahs loaded yet.
          </li>
        )}
      </ul>
    </main>
  );
}
