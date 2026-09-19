import type { Ayah, AyahDetail, Surah, SurahDetail } from "./api";

const AL_FATIHA: Surah = {
  id: 1,
  name_arabic: "الفاتحة",
  name_transliteration: "Al-Fatiha",
  name_translation: "The Opening",
  revelation_place: "meccan",
  ayah_count: 7,
  order_in_revelation: 5,
};

const AYAH_TEXT: { arabic: string; transliteration: string; translation: string }[] = [
  {
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    transliteration: "Bismillahi r-rahmani r-rahim",
    translation: "In the name of Allah, the Most Gracious, the Most Merciful.",
  },
  {
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    transliteration: "Alhamdu lillahi rabbi l-alamin",
    translation: "All praise is due to Allah, Lord of all the worlds.",
  },
  {
    arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
    transliteration: "Ar-rahmani r-rahim",
    translation: "The Most Gracious, the Most Merciful.",
  },
  {
    arabic: "مَالِكِ يَوْمِ الدِّينِ",
    transliteration: "Maliki yawmi d-din",
    translation: "Master of the Day of Judgment.",
  },
  {
    arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    transliteration: "Iyyaka na'budu wa iyyaka nasta'in",
    translation: "You alone we worship, and You alone we ask for help.",
  },
  {
    arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    transliteration: "Ihdina s-sirata l-mustaqim",
    translation: "Guide us to the straight path.",
  },
  {
    arabic:
      "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    transliteration: "Sirata alladhina an'amta alayhim ghayril maghdubi alayhim wa la d-dallin",
    translation:
      "The path of those You have blessed, not of those who have earned Your anger, nor of those who have gone astray.",
  },
];

export const LOCAL_SURAHS: Surah[] = [AL_FATIHA];

export const LOCAL_AYAHS: Ayah[] = AYAH_TEXT.map((row, i) => ({
  id: i + 1,
  surah_id: 1,
  ayah_number: i + 1,
  text_arabic: row.arabic,
  text_uthmani: null,
  text_transliteration: row.transliteration,
  juz: 1,
  hizb: 1,
  rub: 1,
  page: 1,
  sajdah: null,
}));

export function localSurahDetail(id: number): SurahDetail | null {
  const surah = LOCAL_SURAHS.find((s) => s.id === id);
  if (!surah) return null;
  return { ...surah, ayahs: LOCAL_AYAHS.filter((a) => a.surah_id === id) };
}

export function localAyahDetail(id: number): AyahDetail | null {
  const ayah = LOCAL_AYAHS.find((a) => a.id === id);
  if (!ayah) return null;
  const row = AYAH_TEXT[ayah.ayah_number - 1];
  return {
    ...ayah,
    translations: [
      {
        id: `local-en-${ayah.id}`,
        ayah_id: ayah.id,
        translation_id: "local-en",
        text: row.translation,
        language: "en",
        translation_name: "English",
        translator: null,
      },
    ],
  };
}

export function localSearchAyahs(query: string, limit = 20): Ayah[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return LOCAL_AYAHS.filter((a) => {
    const tr = a.text_transliteration?.toLowerCase() ?? "";
    const en = AYAH_TEXT[a.ayah_number - 1]?.translation.toLowerCase() ?? "";
    return a.text_arabic.includes(query.trim()) || tr.includes(q) || en.includes(q);
  }).slice(0, limit);
}
