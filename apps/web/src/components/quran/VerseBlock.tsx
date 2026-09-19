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
      <div className="mb-4 flex items-center justify-between text-xs text-muted">
        <span className="tabular-nums tracking-wide">
          {surahId}:{ayah.ayah_number}
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 text-[11px] text-gold">
          {ayah.ayah_number}
        </span>
      </div>
      <p
        dir="rtl"
        lang="ar"
        className="font-amiri text-right text-[1.85rem] leading-[2.55] text-foreground md:text-[2.05rem] md:leading-[2.7]"
      >
        {ayah.text_arabic}
      </p>
      {transliteration && (
        <p className="mt-4 text-sm italic leading-relaxed text-muted">{transliteration}</p>
      )}
    </>
  );

  const cls = "surface focus-ring block p-5";
  if (href) {
    return (
      <Link href={href} className={`${cls} transition-colors hover:border-gold/50`}>
        {inner}
      </Link>
    );
  }
  return <div className={cls}>{inner}</div>;
}
