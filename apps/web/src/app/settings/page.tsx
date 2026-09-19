"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Page } from "@/components/ui/Page";
import { METHODS, type MadhabKey, type MethodKey } from "@/lib/prayer";
import { STORAGE_KEYS } from "@/lib/storage";

type Theme = "system" | "light" | "dark";

export default function SettingsPage() {
  const [theme, setTheme] = useState<Theme>("system");
  const [language, setLanguage] = useState("en");
  const [method, setMethod] = useState<MethodKey>("MuslimWorldLeague");
  const [madhab, setMadhab] = useState<MadhabKey>("shafi");
  const [sync, setSync] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const t = window.localStorage.getItem(STORAGE_KEYS.theme);
    if (t === "light" || t === "dark") setTheme(t);
    const lang = window.localStorage.getItem(STORAGE_KEYS.language);
    if (lang) setLanguage(lang);
    const m = window.localStorage.getItem(STORAGE_KEYS.method);
    if (m && m in METHODS) setMethod(m as MethodKey);
    const md = window.localStorage.getItem(STORAGE_KEYS.madhab);
    if (md === "shafi" || md === "hanafi") setMadhab(md);
    setSync(window.localStorage.getItem(STORAGE_KEYS.sync) === "true");
    setAnalytics(window.localStorage.getItem(STORAGE_KEYS.analytics) === "true");
  }, []);

  function applyTheme(next: Theme) {
    setTheme(next);
    if (next === "system") {
      window.localStorage.removeItem(STORAGE_KEYS.theme);
      document.documentElement.removeAttribute("data-theme");
    } else {
      window.localStorage.setItem(STORAGE_KEYS.theme, next);
      document.documentElement.setAttribute("data-theme", next);
    }
  }

  return (
    <Page>
      <header>
        <h1 className="font-display text-4xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted">Stored in this browser only.</p>
      </header>

      <Card className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Theme</span>
          <select
            value={theme}
            onChange={(e) => applyTheme(e.target.value as Theme)}
            className="rounded-xl border border-stroke bg-background px-3 py-2"
          >
            <option value="system">System</option>
            <option value="light">Parchment</option>
            <option value="dark">Night</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Language</span>
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              window.localStorage.setItem(STORAGE_KEYS.language, e.target.value);
            }}
            className="rounded-xl border border-stroke bg-background px-3 py-2"
          >
            <option value="en">English</option>
            <option value="ar">Arabic</option>
            <option value="ur">Urdu</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Calculation method</span>
          <select
            value={method}
            onChange={(e) => {
              const v = e.target.value as MethodKey;
              setMethod(v);
              window.localStorage.setItem(STORAGE_KEYS.method, v);
            }}
            className="rounded-xl border border-stroke bg-background px-3 py-2"
          >
            {Object.entries(METHODS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Asr (madhhab)</span>
          <select
            value={madhab}
            onChange={(e) => {
              const v = e.target.value as MadhabKey;
              setMadhab(v);
              window.localStorage.setItem(STORAGE_KEYS.madhab, v);
            }}
            className="rounded-xl border border-stroke bg-background px-3 py-2"
          >
            <option value="shafi">Shafi / others</option>
            <option value="hanafi">Hanafi</option>
          </select>
        </label>
      </Card>

      <Card className="flex flex-col gap-4">
        <p className="text-sm font-medium">Privacy</p>
        <label className="flex items-center justify-between gap-3 text-sm">
          <span>Cloud sync</span>
          <input
            type="checkbox"
            checked={sync}
            onChange={(e) => {
              setSync(e.target.checked);
              window.localStorage.setItem(STORAGE_KEYS.sync, String(e.target.checked));
            }}
          />
        </label>
        <label className="flex items-center justify-between gap-3 text-sm">
          <span>Analytics</span>
          <input
            type="checkbox"
            checked={analytics}
            onChange={(e) => {
              setAnalytics(e.target.checked);
              window.localStorage.setItem(STORAGE_KEYS.analytics, String(e.target.checked));
            }}
          />
        </label>
        <p className="text-xs leading-relaxed text-muted">
          Both stay off by default in product policy. These switches do not send data anywhere yet;
          there is no backend for them.
        </p>
      </Card>
    </Page>
  );
}
