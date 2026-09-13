"use client";

import { useEffect, useState } from "react";
import type { Coords } from "@/lib/prayer";

export function useGeolocation() {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [status, setStatus] = useState<"locating" | "granted" | "denied">("locating");

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

  return { coords, setCoords, status };
}
