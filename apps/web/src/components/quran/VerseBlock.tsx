import Link from "next/link";
import { optionalText, type Ayah } from "@/lib/api";

export function VerseBlock({
  ayah,
  surahId,
  href,
}: {
  ayah: Ayah;
  surahId: number;
  href?: string;
}) {
  const transliteration = optionalText(ayah.text_transliteration);
  const inner = (
    <>
      <div className="mb-3 flex items-center justify-between text-xs text-muted">
        <span className="tabular-nums">
          {surahId}:{ayah.ayah_number}
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-soft text-[11px] text-accent">
          {ayah.ayah_number}
        </span>
      </div>
      <p
        dir="rtl"
        lang="ar"
        className="font-arabic text-right text-[1.7rem] leading-[2.4] text-foreground"
      >
        {ayah.text_arabic}
      </p>
      {transliteration && (
        <p className="mt-3 text-sm italic leading-relaxed text-muted">{transliteration}</p>
      )}
    </>
  );

  const cls = "block rounded-2xl border border-stroke bg-card p-4";
  if (href) {
    return (
      <Link href={href} className={`${cls} transition-colors hover:border-accent/40`}>
        {inner}
      </Link>
    );
  }
  return <div className={cls}>{inner}</div>;
}
