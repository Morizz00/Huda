import Link from "next/link";
import { NextPrayerHero } from "@/components/home/NextPrayerHero";
import { ContinueReading } from "@/components/quran/ContinueReading";
import { VerseBlock } from "@/components/quran/VerseBlock";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Page } from "@/components/ui/Page";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getSurahDetail } from "@/lib/api";
import { greeting, gregorianDateLabel, hijriDateLabel } from "@/lib/dates";

export default async function HomePage() {
  const surah = await getSurahDetail(1);
  const day = Math.floor(Date.now() / 86_400_000);
  const ayah = surah?.ayahs?.length
    ? surah.ayahs[day % surah.ayahs.length]
    : null;

  return (
    <Page>
      <header>
        <p className="text-sm text-muted">{greeting()}</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">HUDA</h1>
        <p className="mt-1 text-sm text-muted">{hijriDateLabel()}</p>
        <p className="text-xs text-muted">{gregorianDateLabel()}</p>
      </header>

      <NextPrayerHero />

      <section className="flex flex-col gap-3">
        <SectionHeader title="Today’s Quran" subtitle="A quiet place to continue" />
        <ContinueReading />
        {ayah && surah ? (
          <VerseBlock ayah={ayah} surahId={surah.id} href={`/quran/${surah.id}/${ayah.ayah_number}`} />
        ) : (
          <EmptyState
            title="Daily ayah is waiting on the API"
            body="Start the Go API and seed Al-Fatiha to show a verse here. The rest of HUDA still works offline."
            actionLabel="Open the Quran"
            actionHref="/quran"
          />
        )}
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeader title="Duas & Adhkar" />
        <Card>
          <p className="text-sm leading-relaxed text-muted">
            Canonical duas and adhkar will appear once sourced collections are published. Nothing
            generated, nothing unsourced.
          </p>
          <div className="mt-3 flex gap-2">
            <Button href="/duas" variant="secondary">
              Duas
            </Button>
            <Button href="/adhkar" variant="ghost">
              Adhkar
            </Button>
          </div>
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeader title="Quick actions" />
        <div className="grid grid-cols-2 gap-3">
          <Quick href="/qibla" title="Qibla" body="Find the direction of the Kaaba" />
          <Quick href="/dhikr" title="Dhikr" body="A quiet counter" />
          <Quick href="/calendar" title="Calendar" body="Hijri dates" />
          <Quick href="/search" title="Search" body="Look up an ayah" />
        </div>
      </section>
    </Page>
  );
}

function Quick({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Link href={href}>
      <Card className="h-full transition-colors hover:border-accent/40">
        <p className="font-medium">{title}</p>
        <p className="mt-1 text-sm text-muted">{body}</p>
      </Card>
    </Link>
  );
}
