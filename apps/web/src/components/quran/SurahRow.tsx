import Link from "next/link";
import type { Surah } from "@/lib/api";

export function SurahRow({ surah }: { surah: Surah }) {
  return (
    <Link
      href={`/quran/${surah.id}`}
      className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-soft"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-soft text-xs tabular-nums text-muted">
        {surah.id}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-medium leading-tight">{surah.name_transliteration}</span>
        <span className="block text-sm text-muted">
          {surah.name_translation} · {surah.ayah_count} ayahs
        </span>
      </span>
      <span dir="rtl" lang="ar" className="font-arabic text-xl">
        {surah.name_arabic}
      </span>
    </Link>
  );
}
