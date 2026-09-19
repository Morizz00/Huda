import {
  localAyahDetail,
  localSearchAyahs,
  localSurahDetail,
  LOCAL_SURAHS,
} from "./quran-local";

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

export async function listSurahs() {
  return LOCAL_SURAHS;
}

export async function getSurahDetail(id: number) {
  return localSurahDetail(id);
}

export async function getAyahDetail(id: number) {
  return localAyahDetail(id);
}

export async function searchAyahs(query: string, limit = 20) {
  return localSearchAyahs(query, limit);
}

export function optionalText(value: string | { String?: string; Valid?: boolean } | null | undefined) {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (value.Valid === false) return null;
  return value.String ?? null;
}
