import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Page } from "@/components/ui/Page";

export default function ProfilePage() {
  return (
    <Page>
      <header>
        <h1 className="font-display text-4xl font-semibold tracking-tight">Profile</h1>
        <p className="mt-1 text-sm text-muted">Anonymous by default. Sync is optional and not on yet.</p>
      </header>

      <Card>
        <p dir="rtl" lang="ar" className="font-amiri text-4xl text-gold">
          هُدًى
        </p>
        <p className="mt-2 font-medium">Local guest</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          Quran, prayer, Qibla, dhikr, calendar, and zakat work without an account. Sign-in will only
          exist to sync bookmarks and preferences.
        </p>
      </Card>

      <div className="flex flex-col gap-3">
        <Link href="/settings">
          <Card className="transition-colors hover:border-accent/40">
            <p className="font-medium">Settings</p>
            <p className="mt-1 text-sm text-muted">Theme, calculation method, privacy</p>
          </Card>
        </Link>
        <Link href="/bookmarks">
          <Card className="transition-colors hover:border-accent/40">
            <p className="font-medium">Bookmarks</p>
            <p className="mt-1 text-sm text-muted">Waiting on accounts</p>
          </Card>
        </Link>
      </div>
    </Page>
  );
}
