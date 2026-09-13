const API_URL = process.env.API_URL ?? "http://localhost:8080/api/v1";

export type Surah = {
  id: number;
  name_arabic: string;
  name_transliteration: string;
  name_translation: string;
  revelation_place: string;
  ayah_count: number;
  order_in_revelation: number | null;
};

export type Ayah = {
  id: number;
  surah_id: number;
  ayah_number: number;
  text_arabic: string;
  text_uthmani: string | null;
  text_transliteration: string | null;
  juz: number;
  hizb: number;
  rub: number;
  page: number;
  sajdah: string | null;
};

export type AyahTranslation = {
  id: string;
  ayah_id: number;
  translation_id: string;
  text: string;
  language: string;
  translation_name: string;
  translator: string | null;
};

export type SurahDetail = Surah & { ayahs: Ayah[] };
export type AyahDetail = Ayah & { translations: AyahTranslation[] };

async function apiFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export function listSurahs() {
  return apiFetch<Surah[]>("/quran/surahs").then((v) => v ?? []);
}

export function getSurahDetail(id: number) {
  return apiFetch<SurahDetail>(`/quran/surahs/${id}`);
}

export function getAyahDetail(id: number) {
  return apiFetch<AyahDetail>(`/quran/ayah/${id}`);
}

export function searchAyahs(query: string, limit = 20) {
  const q = encodeURIComponent(query);
  return apiFetch<Ayah[]>(`/quran/search?q=${q}&limit=${limit}`).then((v) => v ?? []);
}

export function optionalText(value: string | { String?: string; Valid?: boolean } | null | undefined) {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (value.Valid === false) return null;
  return value.String ?? null;
}
