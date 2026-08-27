"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  CalculationMethod,
  Coordinates,
  PrayerTimes,
  SunnahTimes,
} from "adhan";

const METHODS = {
  MuslimWorldLeague: "Muslim World League",
  Egyptian: "Egyptian General Authority",
  Karachi: "University of Islamic Sciences, Karachi",
  UmmAlQura: "Umm Al-Qura University, Makkah",
  Dubai: "Dubai",
  MoonsightingCommittee: "Moonsighting Committee",
  NorthAmerica: "ISNA (North America)",
  Kuwait: "Kuwait",
  Qatar: "Qatar",
  Singapore: "Singapore",
  Tehran: "Tehran",
  Turkey: "Turkey",
} as const;

type MethodKey = keyof typeof METHODS;

const PRAYER_ROWS = [
  ["fajr", "Fajr"],
  ["sunrise", "Sunrise"],
  ["dhuhr", "Dhuhr"],
  ["asr", "Asr"],
  ["sunset", "Sunset"],
  ["maghrib", "Maghrib"],
  ["isha", "Isha"],
] as const;

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function PrayerPage() {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [status, setStatus] = useState<"locating" | "granted" | "denied">("locating");
  const [manualLat, setManualLat] = useState("");
  const [manualLng, setManualLng] = useState("");
  const [method, setMethod] = useState<MethodKey>("MuslimWorldLeague");
  const [madhab, setMadhab] = useState<"shafi" | "hanafi">("shafi");
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setStatus("denied");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        setStatus("granted");
      },
      () => setStatus("denied"),
      { timeout: 10_000 },
    );
  }, []);

  function submitManualLocation(e: FormEvent) {
    e.preventDefault();
    const latitude = parseFloat(manualLat);
    const longitude = parseFloat(manualLng);
    if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
      setCoords({ latitude, longitude });
      setStatus("granted");
    }
  }

  const result = useMemo(() => {
    if (!coords || !now) return null;
    const coordinates = new Coordinates(coords.latitude, coords.longitude);
    const params = CalculationMethod[method]();
    params.madhab = madhab;
    const prayerTimes = new PrayerTimes(coordinates, now, params);
    const sunnahTimes = new SunnahTimes(prayerTimes);
    return { prayerTimes, sunnahTimes };
  }, [coords, method, madhab, now]);

  const nextPrayer = now && result ? result.prayerTimes.nextPrayer(now) : "none";

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-6 py-10">
      <header>
        <h1 className="text-2xl font-semibold">Prayer Times</h1>
        <p className="text-sm text-neutral-500">
          {now?.toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      {status === "locating" && (
        <p className="text-sm text-neutral-500">Finding your location…</p>
      )}

      {status === "denied" && !coords && (
        <form
          onSubmit={submitManualLocation}
          className="flex flex-col gap-3 rounded-xl border border-neutral-200 p-4 dark:border-neutral-800"
        >
          <p className="text-sm text-neutral-500">
            Location wasn&apos;t available. Enter coordinates manually.
          </p>
          <div className="flex gap-3">
            <input
              type="number"
              step="any"
              placeholder="Latitude"
              value={manualLat}
              onChange={(e) => setManualLat(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
              required
            />
            <input
              type="number"
              step="any"
              placeholder="Longitude"
              value={manualLng}
              onChange={(e) => setManualLng(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
              required
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-neutral-900"
          >
            Use these coordinates
          </button>
        </form>
      )}

      {coords && (
        <div className="flex flex-wrap gap-3 text-sm">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as MethodKey)}
            className="rounded-lg border border-neutral-300 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900"
          >
            {Object.entries(METHODS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <select
            value={madhab}
            onChange={(e) => setMadhab(e.target.value as "shafi" | "hanafi")}
            className="rounded-lg border border-neutral-300 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900"
          >
            <option value="shafi">Shafi (standard Asr)</option>
            <option value="hanafi">Hanafi (later Asr)</option>
          </select>
        </div>
      )}

      {result && (
        <div className="flex flex-col divide-y divide-neutral-200 rounded-xl border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
          {PRAYER_ROWS.map(([key, label]) => (
            <div
              key={key}
              className={`flex items-center justify-between px-4 py-3 ${
                nextPrayer === key ? "bg-neutral-50 dark:bg-neutral-900" : ""
              }`}
            >
              <span className="font-medium">{label}</span>
              <span className="tabular-nums text-neutral-600 dark:text-neutral-300">
                {formatTime(result.prayerTimes[key])}
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between px-4 py-3 text-neutral-500">
            <span>Midnight</span>
            <span className="tabular-nums">
              {formatTime(result.sunnahTimes.middleOfTheNight)}
            </span>
          </div>
          <div className="flex items-center justify-between px-4 py-3 text-neutral-500">
            <span>Last Third of the Night</span>
            <span className="tabular-nums">
              {formatTime(result.sunnahTimes.lastThirdOfTheNight)}
            </span>
          </div>
        </div>
      )}
    </main>
  );
}
