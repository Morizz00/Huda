import {
  CalculationMethod,
  Coordinates,
  PrayerTimes,
  SunnahTimes,
} from "adhan";

export const METHODS = {
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

export type MethodKey = keyof typeof METHODS;
export type MadhabKey = "shafi" | "hanafi";

export const PRAYER_ROWS = [
  ["fajr", "Fajr"],
  ["sunrise", "Sunrise"],
  ["dhuhr", "Dhuhr"],
  ["asr", "Asr"],
  ["sunset", "Sunset"],
  ["maghrib", "Maghrib"],
  ["isha", "Isha"],
] as const;

export type PrayerKey = (typeof PRAYER_ROWS)[number][0];

export type Coords = { latitude: number; longitude: number };

export function computePrayerTimes(
  coords: Coords,
  now: Date,
  method: MethodKey,
  madhab: MadhabKey,
) {
  const coordinates = new Coordinates(coords.latitude, coords.longitude);
  const params = CalculationMethod[method]();
  params.madhab = madhab as typeof params.madhab;
  const prayerTimes = new PrayerTimes(coordinates, now, params);
  const sunnahTimes = new SunnahTimes(prayerTimes);
  return { prayerTimes, sunnahTimes };
}

export function nextPrayerTime(prayerTimes: PrayerTimes, now: Date) {
  const name = prayerTimes.nextPrayer(now);
  if (name === "none") return { name: null as PrayerKey | null, time: null as Date | null };
  return { name: name as PrayerKey, time: prayerTimes.timeForPrayer(name) };
}
