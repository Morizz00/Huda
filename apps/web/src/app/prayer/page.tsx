"use client";

import { useEffect, useMemo, useState } from "react";
import { ManualLocationForm } from "@/components/prayer/ManualLocationForm";
import { PrayerList } from "@/components/prayer/PrayerList";
import { Button } from "@/components/ui/Button";
import { Page } from "@/components/ui/Page";
import { gregorianDateLabel } from "@/lib/dates";
import {
  computePrayerTimes,
  METHODS,
  type MadhabKey,
  type MethodKey,
} from "@/lib/prayer";
import { STORAGE_KEYS, writeStorage } from "@/lib/storage";
import { useGeolocation } from "@/lib/useGeolocation";

export default function PrayerPage() {
  const { coords, setCoords, status } = useGeolocation();
  const [method, setMethod] = useState<MethodKey>("MuslimWorldLeague");
  const [madhab, setMadhab] = useState<MadhabKey>("shafi");
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const storedMethod = window.localStorage.getItem(STORAGE_KEYS.method);
    const storedMadhab = window.localStorage.getItem(STORAGE_KEYS.madhab);
    if (storedMethod && storedMethod in METHODS) setMethod(storedMethod as MethodKey);
    if (storedMadhab === "hanafi" || storedMadhab === "shafi") setMadhab(storedMadhab);
  }, []);

  const result = useMemo(() => {
    if (!coords || !now) return null;
    return computePrayerTimes(coords, now, method, madhab);
  }, [coords, method, madhab, now]);

  const nextPrayer = now && result ? result.prayerTimes.nextPrayer(now) : "none";

  return (
    <Page>
      <header>
        <h1 className="font-display text-4xl font-semibold tracking-tight">Prayer times</h1>
        <p className="mt-1 text-sm text-muted">{now ? gregorianDateLabel(now) : "…"}</p>
      </header>

      {status === "locating" && <p className="text-sm text-muted">Finding your location…</p>}

      {status === "denied" && !coords && (
        <ManualLocationForm onSubmit={setCoords} />
      )}

      {coords && (
        <div className="flex flex-wrap gap-3 text-sm">
          <select
            value={method}
            onChange={(e) => {
              const value = e.target.value as MethodKey;
              setMethod(value);
              writeStorage(STORAGE_KEYS.method, value);
            }}
            className="rounded-xl border border-stroke bg-card px-3 py-2"
          >
            {Object.entries(METHODS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <select
            value={madhab}
            onChange={(e) => {
              const value = e.target.value as MadhabKey;
              setMadhab(value);
              writeStorage(STORAGE_KEYS.madhab, value);
            }}
            className="rounded-xl border border-stroke bg-card px-3 py-2"
          >
            <option value="shafi">Shafi (standard Asr)</option>
            <option value="hanafi">Hanafi (later Asr)</option>
          </select>
        </div>
      )}

      {result && (
        <PrayerList
          prayerTimes={result.prayerTimes}
          sunnahTimes={result.sunnahTimes}
          next={nextPrayer}
        />
      )}

      <Button href="/qibla" variant="secondary">
        Open Qibla
      </Button>
    </Page>
  );
}
