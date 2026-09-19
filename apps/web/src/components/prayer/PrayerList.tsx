import { formatClock } from "@/lib/dates";
import { PRAYER_ROWS, type PrayerKey } from "@/lib/prayer";
import type { PrayerTimes, SunnahTimes } from "adhan";

export function PrayerList({
  prayerTimes,
  sunnahTimes,
  next,
}: {
  prayerTimes: PrayerTimes;
  sunnahTimes: SunnahTimes;
  next: PrayerKey | "none" | null;
}) {
  return (
    <div className="surface overflow-hidden">
      {PRAYER_ROWS.map(([key, label]) => {
        const isNext = next === key;
        return (
          <div
            key={key}
            className={`flex items-center justify-between px-4 py-3.5 ${
              isNext ? "bg-soft" : ""
            } border-b border-stroke last:border-b-0`}
          >
            <span className="flex items-center gap-2 font-medium">
              {label}
              {isNext && (
                <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gold">
                  Next
                </span>
              )}
            </span>
            <span className="tabular-nums text-muted">{formatClock(prayerTimes[key])}</span>
          </div>
        );
      })}
      <div className="flex items-center justify-between border-t border-stroke px-4 py-3 text-sm text-muted">
        <span>Midnight</span>
        <span className="tabular-nums">{formatClock(sunnahTimes.middleOfTheNight)}</span>
      </div>
      <div className="flex items-center justify-between px-4 py-3 text-sm text-muted">
        <span>Last third of the night</span>
        <span className="tabular-nums">{formatClock(sunnahTimes.lastThirdOfTheNight)}</span>
      </div>
    </div>
  );
}
