"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Page } from "@/components/ui/Page";
import { hijriDateLabel } from "@/lib/dates";

const NOTES: { month: number; day: number; name: string }[] = [
  { month: 1, day: 1, name: "Islamic New Year" },
  { month: 1, day: 10, name: "Ashura" },
  { month: 9, day: 1, name: "Ramadan begins" },
  { month: 9, day: 27, name: "Laylat al-Qadr (commonly observed)" },
  { month: 10, day: 1, name: "Eid al-Fitr" },
  { month: 12, day: 9, name: "Arafah" },
  { month: 12, day: 10, name: "Eid al-Adha" },
];

function hijriParts(date: Date) {
  const fmt = new Intl.DateTimeFormat("en-u-ca-islamic", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  const parts = fmt.formatToParts(date);
  const num = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return { day: num("day"), month: num("month"), year: num("year") };
}

export default function CalendarPage() {
  const [cursor, setCursor] = useState(() => new Date());

  const grid = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const first = new Date(year, month, 1);
    const startPad = first.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: { date: Date | null }[] = [];
    for (let i = 0; i < startPad; i++) cells.push({ date: null });
    for (let d = 1; d <= daysInMonth; d++) cells.push({ date: new Date(year, month, d) });
    return cells;
  }, [cursor]);

  const monthLabel = cursor.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  const todayKey = new Date().toDateString();

  return (
    <Page>
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Calendar</h1>
          <p className="mt-1 text-sm text-muted">{hijriDateLabel()}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-xl bg-soft px-3 py-1.5 text-sm"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          >
            Prev
          </button>
          <button
            type="button"
            className="rounded-xl bg-soft px-3 py-1.5 text-sm"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          >
            Next
          </button>
        </div>
      </header>

      <p className="text-sm text-muted">{monthLabel}</p>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-muted">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={`${d}-${i}`} className="py-1">
            {d}
          </div>
        ))}
        {grid.map((cell, i) => {
          if (!cell.date) return <div key={`e-${i}`} />;
          const h = hijriParts(cell.date);
          const note = NOTES.find((n) => n.month === h.month && n.day === h.day);
          const isToday = cell.date.toDateString() === todayKey;
          return (
            <div
              key={cell.date.toISOString()}
              className={`rounded-xl py-2 ${isToday ? "bg-accent text-accent-fg" : "bg-card border border-stroke"}`}
            >
              <div className="text-xs font-medium">{cell.date.getDate()}</div>
              <div className={`text-[10px] ${isToday ? "text-accent-fg/80" : "text-muted"}`}>{h.day}</div>
              {note && <div className="mx-auto mt-1 h-1 w-1 rounded-full bg-accent" />}
            </div>
          );
        })}
      </div>

      <Card>
        <p className="text-sm font-medium">Marked days</p>
        <ul className="mt-2 flex flex-col gap-1 text-sm text-muted">
          {NOTES.map((n) => (
            <li key={n.name}>
              {n.day}/{n.month} AH — {n.name}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          Sighting and regional conventions differ. These markers are educational, not a fatwa on
          when a month begins.
        </p>
      </Card>
    </Page>
  );
}
