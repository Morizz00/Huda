import Link from "next/link";
import { VerseBlock } from "@/components/quran/VerseBlock";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { IconArrowLeft } from "@/components/ui/Icon";
import { Page } from "@/components/ui/Page";
import { getAyahDetail, getSurahDetail } from "@/lib/api";

export default async function AyahPage({
  params,
}: {
  params: Promise<{ id: string; ayah: string }>;
}) {
  const { id, ayah: ayahParam } = await params;
  const surahId = Number(id);
  const ayahNumber = Number(ayahParam);

  if (!Number.isInteger(surahId) || !Number.isInteger(ayahNumber)) {
    return (
      <Page width="wide">
        <EmptyState title="Unknown ayah" body="That address is not a valid verse reference." />
      </Page>
    );
  }

  const surah = await getSurahDetail(surahId);
  const listed = surah?.ayahs.find((a) => a.ayah_number === ayahNumber);
  const detail = listed ? await getAyahDetail(listed.id) : null;
  const ayah = detail ?? listed ?? null;

  if (!ayah) {
    return (
      <Page width="wide">
        <Link href={`/quran/${surahId}`} className="inline-flex items-center gap-1 text-sm text-muted">
          <IconArrowLeft size={16} /> Back to surah
        </Link>
        <EmptyState
          title="Ayah unavailable"
          body="This verse is not in the local corpus yet, or the API is offline."
        />
      </Page>
    );
  }

  return (
    <Page width="wide">
      <Link href={`/quran/${surahId}`} className="inline-flex items-center gap-1 text-sm text-muted">
        <IconArrowLeft size={16} /> {surah?.name_transliteration ?? "Surah"}
      </Link>
      <VerseBlock ayah={ayah} surahId={surahId} />
      {detail?.translations?.length ? (
        <div className="flex flex-col gap-3">
          {detail.translations.map((t) => (
            <Card key={t.id}>
              <p className="text-xs uppercase tracking-wide text-muted">
                {t.translation_name}
                {t.translator ? ` · ${t.translator}` : ""}
              </p>
              <p className="mt-2 leading-relaxed">{t.text}</p>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No translation on this ayah"
          body="Translations appear when they are attached in the database. Arabic remains the source text."
        />
      )}
    </Page>
  );
}
