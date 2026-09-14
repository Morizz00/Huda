"use client";

import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Coords } from "@/lib/prayer";

export function ManualLocationForm({
  onSubmit,
  hint,
}: {
  onSubmit: (coords: Coords) => void;
  hint?: string;
}) {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  function handle(e: FormEvent) {
    e.preventDefault();
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
      onSubmit({ latitude, longitude });
    }
  }

  return (
    <form
      onSubmit={handle}
      className="surface flex flex-col gap-3 p-4"
    >
      <p className="text-sm text-muted">
        {hint ?? "Location wasn’t available. Enter coordinates manually."}
      </p>
      <div className="flex gap-3">
        <input
          type="number"
          step="any"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          className="focus-ring w-full rounded-xl border border-stroke bg-background px-3 py-2 text-sm transition-colors focus:border-accent"
          required
        />
        <input
          type="number"
          step="any"
          placeholder="Longitude"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          className="focus-ring w-full rounded-xl border border-stroke bg-background px-3 py-2 text-sm transition-colors focus:border-accent"
          required
        />
      </div>
      <Button type="submit" variant="secondary">
        Use these coordinates
      </Button>
    </form>
  );
}
