"use client";

import { useEffect, useMemo, useState } from "react";
import { HeroShell } from "@/components/home/HeroShell";
import { Button } from "@/components/ui/Button";
import { formatClock, formatCountdown } from "@/lib/dates";
import {
  computePrayerTimes,
  METHODS,
  nextPrayerTime,
  type MadhabKey,
  type MethodKey,
} from "@/lib/prayer";
import { STORAGE_KEYS, readStorage } from "@/lib/storage";
import { useGeolocation } from "@/lib/useGeolocation";

const ORDER = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"] as const;

function prayerLabel(name: string | null) {
  if (!name) return "Isha complete";
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function Eyebrow({ children }: { children: string }) {
  return <p className="text-xs uppercase tracking-[0.26em] text-gold">{children}</p>;
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
    const past = ORDER.map((key) => times.prayerTimes[key]).filter((t) => t.getTime() <= now.getTime());
    const previous = past.length ? past[past.length - 1] : null;
    const remaining = next.time ? next.time.getTime() - now.getTime() : 0;
    const span = next.time && previous ? next.time.getTime() - previous.getTime() : 0;
    const progress = span > 0 ? Math.min(1, Math.max(0, 1 - remaining / span)) : 0;
    return { next, remaining, progress };
  }, [coords, now, method, madhab]);

  if (status === "locating") {
    return (
      <HeroShell>
        <Eyebrow>Finding location</Eyebrow>
        <p className="mt-3 font-display text-4xl font-semibold tracking-tight">Next prayer</p>
        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-hero-fg/10">
          <div className="h-full w-1/3 animate-pulse rounded-full bg-hero-fg/30" />
        </div>
      </HeroShell>
    );
  }

  if (!coords) {
    return (
      <HeroShell>
        <Eyebrow>Prayer times</Eyebrow>
        <p className="mt-2 font-display text-4xl font-semibold tracking-tight">Set your location</p>
        <p className="mt-2 max-w-xs text-sm text-hero-fg/70">
          Allow location or enter coordinates on the prayer page. Nothing leaves your device.
        </p>
        <div className="mt-5">
          <Button href="/prayer" variant="hero">
            Open prayer times
          </Button>
        </div>
      </HeroShell>
    );
  }

  if (!result?.next.name) {
    return (
      <HeroShell>
        <Eyebrow>Tonight</Eyebrow>
        <p className="mt-2 font-display text-4xl font-semibold tracking-tight">Isha has passed</p>
        <p className="mt-2 text-sm text-hero-fg/70">Fajr is next after midnight.</p>
        <div className="mt-5">
          <Button href="/prayer" variant="hero">
            Today&apos;s times
          </Button>
        </div>
      </HeroShell>
    );
  }

  return (
    <HeroShell>
      <Eyebrow>Next prayer</Eyebrow>
      <div className="mt-2 flex items-end justify-between gap-3">
        <p className="font-display text-5xl font-semibold leading-none tracking-tight md:text-6xl">
          {prayerLabel(result.next.name)}
        </p>
        {result.next.time && (
          <p className="pb-1 font-display text-2xl text-gold">{formatClock(result.next.time)}</p>
        )}
      </div>
      <p className="mt-4 font-mono text-3xl tabular-nums tracking-wide text-gold md:text-4xl">
        {formatCountdown(result.remaining)}
      </p>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-hero-fg/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-aurora-a via-gold to-aurora-b transition-[width] duration-1000 ease-linear"
          style={{ width: `${(result.progress * 100).toFixed(1)}%` }}
        />
      </div>
      <div className="mt-5">
        <Button href="/prayer" variant="hero">
          Today&apos;s times
        </Button>
      </div>
    </HeroShell>
  );
}
