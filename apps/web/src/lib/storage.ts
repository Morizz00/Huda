"use client";

export const STORAGE_KEYS = {
  lastSurah: "huda.lastSurah",
  dhikrCount: "huda.dhikrCount",
  dhikrTarget: "huda.dhikrTarget",
  theme: "huda.theme",
  method: "huda.method",
  madhab: "huda.madhab",
  language: "huda.language",
  sync: "huda.syncEnabled",
  analytics: "huda.analyticsEnabled",
} as const;

export function readStorage(key: string, fallback = "") {
  if (typeof window === "undefined") return fallback;
  return window.localStorage.getItem(key) ?? fallback;
}

export function writeStorage(key: string, value: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, value);
}
