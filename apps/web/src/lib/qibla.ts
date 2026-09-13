const KAABA = { latitude: 21.4225, longitude: 39.8262 };

function toRad(d: number) {
  return (d * Math.PI) / 180;
}

function toDeg(r: number) {
  return (r * 180) / Math.PI;
}

export function qiblaBearing(latitude: number, longitude: number) {
  const latK = toRad(KAABA.latitude);
  const lngK = toRad(KAABA.longitude);
  const latU = toRad(latitude);
  const dLng = lngK - toRad(longitude);
  const y = Math.sin(dLng);
  const x = Math.cos(latU) * Math.tan(latK) - Math.sin(latU) * Math.cos(dLng);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

export function distanceToKaabaKm(latitude: number, longitude: number) {
  const R = 6371;
  const dLat = toRad(KAABA.latitude - latitude);
  const dLng = toRad(KAABA.longitude - longitude);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(latitude)) * Math.cos(toRad(KAABA.latitude)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));
}

export function formatBearing(deg: number) {
  return `${Math.round(deg)}°`;
}
