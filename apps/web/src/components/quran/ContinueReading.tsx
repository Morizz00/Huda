"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { STORAGE_KEYS, readStorage } from "@/lib/storage";

export function ContinueReading({ fallbackHref = "/quran/1" }: { fallbackHref?: string }) {
  const [href, setHref] = useState(fallbackHref);
  const [label, setLabel] = useState("Al-Fatiha");

  useEffect(() => {
    const stored = readStorage(STORAGE_KEYS.lastSurah);
    if (stored) {
      const [id, name] = stored.split("|");
      if (id) {
        setHref(`/quran/${id}`);
        setLabel(name || `Surah ${id}`);
      }
    }
  }, []);

  return (
    <Link href={href}>
      <Card className="transition-colors hover:border-gold/50">
        <p className="text-xs uppercase tracking-[0.2em] text-gold">Continue reading</p>
        <p className="mt-1 font-display text-2xl">{label}</p>
        <p className="mt-1 text-sm text-muted">Pick up where you left the mushaf.</p>
      </Card>
    </Link>
  );
}

export function RememberSurah({ id, name }: { id: number; name: string }) {
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.lastSurah, `${id}|${name}`);
  }, [id, name]);
  return null;
}
