"use client";

import { useEffect, useMemo, useState } from "react";
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
      <div className="rounded-2xl bg-hero px-5 py-6 text-hero-fg">
        <p className="text-sm text-hero-fg/70">Finding your location…</p>
        <p className="mt-3 text-3xl font-semibold tracking-tight">Next prayer</p>
      </div>
    );
  }

  if (!coords) {
    return (
      <div className="rounded-2xl bg-hero px-5 py-6 text-hero-fg">
        <p className="text-sm text-hero-fg/70">Prayer times</p>
        <p className="mt-2 text-2xl font-semibold tracking-tight">Set your location</p>
        <p className="mt-2 text-sm text-hero-fg/70">
          Allow location or enter coordinates on the prayer page.
        </p>
        <div className="mt-4">
          <Button href="/prayer" variant="hero">
            Open prayer times
          </Button>
        </div>
      </div>
    );
  }

  if (!result?.next.name) {
    return (
      <div className="rounded-2xl bg-hero px-5 py-6 text-hero-fg">
        <p className="text-sm text-hero-fg/70">Tonight</p>
        <p className="mt-1 text-3xl font-semibold tracking-tight">Isha has passed</p>
        <p className="mt-2 text-sm text-hero-fg/70">Fajr is next after midnight.</p>
        <div className="mt-4">
          <Button href="/prayer" variant="hero">
            Today&apos;s times
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-hero px-5 py-6 text-hero-fg">
      <p className="text-sm text-hero-fg/70">Next prayer</p>
      <p className="mt-1 text-3xl font-semibold tracking-tight">{prayerLabel(result.next.name)}</p>
      <p className="mt-3 font-mono text-2xl tabular-nums tracking-wide">
        {formatCountdown(result.remaining)}
      </p>
      <div className="mt-5">
        <Button href="/prayer" variant="hero">
          Today&apos;s times
        </Button>
      </div>
    </div>
  );
}
