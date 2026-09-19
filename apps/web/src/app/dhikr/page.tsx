"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Page } from "@/components/ui/Page";
import { STORAGE_KEYS } from "@/lib/storage";

export default function DhikrPage() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const bead = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const c = Number(window.localStorage.getItem(STORAGE_KEYS.dhikrCount) ?? 0);
    const t = Number(window.localStorage.getItem(STORAGE_KEYS.dhikrTarget) ?? 33);
    if (Number.isFinite(c)) setCount(c);
    if (Number.isFinite(t) && t > 0) setTarget(t);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.dhikrCount, String(count));
  }, [count]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.dhikrTarget, String(target));
  }, [target]);

  function tap() {
    setCount((n) => n + 1);
    if (!bead.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(bead.current, { scale: 0.94 }, { scale: 1, duration: 0.28, ease: "power2.out" });
  }

  const progress = Math.min(1, count / target);

  return (
    <Page>
      <header>
        <h1 className="font-display text-4xl font-semibold tracking-tight">Dhikr</h1>
        <p className="mt-1 text-sm text-muted">Stays on this device. No account required.</p>
      </header>

      <button
        ref={bead}
        type="button"
        onClick={tap}
        className="flex aspect-square w-full max-h-[min(70vw,22rem)] flex-col items-center justify-center self-center rounded-full border border-gold/40 bg-card"
      >
        <span className="font-display text-7xl tabular-nums text-gold">{count}</span>
        <span className="mt-2 text-sm text-muted">of {target}</span>
      </button>

      <div className="h-1.5 overflow-hidden rounded-full bg-soft">
        <div className="h-full bg-gold" style={{ width: `${progress * 100}%` }} />
      </div>

      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => setCount(0)}>
          Reset
        </Button>
        <Button variant="ghost" onClick={() => setTarget((t) => (t === 33 ? 99 : 33))}>
          Target {target === 33 ? "99" : "33"}
        </Button>
      </div>

      <Card>
        <p className="text-sm leading-relaxed text-muted">
          A counter is a tool, not a score. HUDA does not rank, streak, or share this number.
        </p>
      </Card>
    </Page>
  );
}
