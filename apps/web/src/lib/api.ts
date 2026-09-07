const API_URL = process.env.API_URL ?? "http://localhost:8090/api/v1";

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
  const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  return res.json();
}

export function listSurahs() {
  return apiFetch<Surah[]>("/quran/surahs").then((v) => v ?? []);
}

export function getSurahDetail(id: number) {
  return apiFetch<SurahDetail>(`/quran/surahs/${id}`);
}
