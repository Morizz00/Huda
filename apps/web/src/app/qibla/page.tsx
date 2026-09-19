"use client";

import { useEffect, useState } from "react";
import { ManualLocationForm } from "@/components/prayer/ManualLocationForm";
import { Card } from "@/components/ui/Card";
import { Page } from "@/components/ui/Page";
import { distanceToKaabaKm, formatBearing, qiblaBearing } from "@/lib/qibla";
import { useGeolocation } from "@/lib/useGeolocation";

export default function QiblaPage() {
  const { coords, setCoords, status } = useGeolocation();
  const [heading, setHeading] = useState<number | null>(null);

  useEffect(() => {
    const handler = (event: DeviceOrientationEvent) => {
      const anyEvent = event as DeviceOrientationEvent & { webkitCompassHeading?: number };
      if (typeof anyEvent.webkitCompassHeading === "number") {
        setHeading(anyEvent.webkitCompassHeading);
        return;
      }
      if (event.alpha != null) setHeading(360 - event.alpha);
    };
    window.addEventListener("deviceorientation", handler);
    return () => window.removeEventListener("deviceorientation", handler);
  }, []);

  const bearing = coords ? qiblaBearing(coords.latitude, coords.longitude) : null;
  const distance = coords ? distanceToKaabaKm(coords.latitude, coords.longitude) : null;
  const needle = bearing == null ? 0 : bearing - (heading ?? 0);

  return (
    <Page>
      <header>
        <h1 className="font-display text-4xl font-semibold tracking-tight">Qibla</h1>
        <p className="mt-1 text-sm text-muted">Calculated on this device. No network required.</p>
      </header>

      {status === "locating" && <p className="text-sm text-muted">Finding your location…</p>}
      {status === "denied" && !coords && (
        <ManualLocationForm onSubmit={setCoords} hint="Enter coordinates to compute Qibla." />
      )}

      {bearing != null && (
        <>
          <div className="flex flex-col items-center gap-6 py-4">
            <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-gold/35 bg-card">
              <div className="absolute inset-6 rounded-full border border-dashed border-gold/20" />
              <span className="absolute top-3 text-xs text-gold">N</span>
              <div
                className="h-28 w-1 origin-bottom rounded-full bg-gold"
                style={{ transform: `rotate(${needle}deg)` }}
              />
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold tabular-nums">{formatBearing(bearing)}</p>
              <p className="mt-1 text-sm text-muted">
                {distance != null ? `${Math.round(distance).toLocaleString()} km to the Kaaba` : ""}
              </p>
              <p className="mt-2 text-xs text-muted">
                {heading == null
                  ? "Compass heading unavailable — the mark shows true bearing from north."
                  : "Needle follows device heading relative to Qibla."}
              </p>
            </div>
          </div>
          <Card>
            <p className="text-sm leading-relaxed text-muted">
              Calibrate by moving the device in a figure-eight if the heading drifts. Magnetic
              interference from cases and speakers will throw the compass off.
            </p>
          </Card>
        </>
      )}
    </Page>
  );
}
