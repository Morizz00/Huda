"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { formatCountdown } from "@/lib/dates";
import {
  computePrayerTimes,
  METHODS,
  nextPrayerTime,
  type MadhabKey,
  type MethodKey,
} from "@/lib/prayer";
import { STORAGE_KEYS, readStorage } from "@/lib/storage";
import { useGeolocation } from "@/lib/useGeolocation";

function prayerLabel(name: string | null) {
  if (!name) return "Isha complete";
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[1.6rem] border border-gold/25 bg-hero px-5 py-7 text-hero-fg">
      <div className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full border border-gold/20" />
      <div className="pointer-events-none absolute -right-2 -top-4 h-24 w-24 rounded-full border border-gold/15" />
      {children}
    </div>
  );
}

export function NextPrayerHero() {
  const { coords, status } = useGeolocation();
  const [now, setNow] = useState<Date | null>(null);
  const method = (readStorage(STORAGE_KEYS.method, "MuslimWorldLeague") ||
    "MuslimWorldLeague") as MethodKey;
  const madhab = (readStorage(STORAGE_KEYS.madhab, "shafi") || "shafi") as MadhabKey;

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const result = useMemo(() => {
    if (!coords || !now) return null;
    const times = computePrayerTimes(coords, now, method in METHODS ? method : "MuslimWorldLeague", madhab);
    const next = nextPrayerTime(times.prayerTimes, now);
    return { next, remaining: next.time ? next.time.getTime() - now.getTime() : 0 };
  }, [coords, now, method, madhab]);

  if (status === "locating") {
    return (
      <Shell>
        <p className="text-xs uppercase tracking-[0.22em] text-gold">Finding location</p>
        <p className="mt-3 font-display text-4xl">Next prayer</p>
      </Shell>
    );
  }

  if (!coords) {
    return (
      <Shell>
        <p className="text-xs uppercase tracking-[0.22em] text-gold">Prayer times</p>
        <p className="mt-2 font-display text-4xl">Set your location</p>
        <p className="mt-2 text-sm text-hero-fg/70">
          Allow location or enter coordinates on the prayer page.
        </p>
        <div className="mt-5">
          <Button href="/prayer" variant="hero">
            Open prayer times
          </Button>
        </div>
      </Shell>
    );
  }

  if (!result?.next.name) {
    return (
      <Shell>
        <p className="text-xs uppercase tracking-[0.22em] text-gold">Tonight</p>
        <p className="mt-2 font-display text-4xl">Isha has passed</p>
        <p className="mt-2 text-sm text-hero-fg/70">Fajr is next after midnight.</p>
        <div className="mt-5">
          <Button href="/prayer" variant="hero">
            Today&apos;s times
          </Button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <p className="text-xs uppercase tracking-[0.22em] text-gold">Next prayer</p>
      <p className="mt-2 font-display text-5xl">{prayerLabel(result.next.name)}</p>
      <p className="mt-4 font-mono text-3xl tabular-nums tracking-wide text-gold">
        {formatCountdown(result.remaining)}
      </p>
      <div className="mt-6">
        <Button href="/prayer" variant="hero">
          Today&apos;s times
        </Button>
      </div>
    </Shell>
  );
}
