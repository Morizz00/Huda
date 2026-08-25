import { sqliteTable, text, integer, uniqueIndex } from "drizzle-orm/sqlite-core";

export const surahs = sqliteTable("surahs", {
  id: integer("id").primaryKey(), // 1-114
  nameArabic: text("name_arabic").notNull(),
  nameTransliteration: text("name_transliteration").notNull(),
  nameTranslation: text("name_translation").notNull(),
  revelationPlace: text("revelation_place").notNull(), // meccan | medinan
  ayahCount: integer("ayah_count").notNull(),
  orderInRevelation: integer("order_in_revelation"),
});

export const ayahs = sqliteTable(
  "ayahs",
  {
    id: integer("id").primaryKey(), // global ayah number, 1-6236
    surahId: integer("surah_id").notNull().references(() => surahs.id),
    ayahNumber: integer("ayah_number").notNull(), // number within surah
    textArabic: text("text_arabic").notNull(),
    textUthmani: text("text_uthmani"),
    textTransliteration: text("text_transliteration"),
    juz: integer("juz").notNull(),
    hizb: integer("hizb").notNull(),
    rub: integer("rub").notNull(),
    page: integer("page").notNull(),
    sajdah: text("sajdah"), // null | recommended | obligatory
  },
  (table) => ({
    surahAyahIdx: uniqueIndex("ayahs_surah_ayah_idx").on(table.surahId, table.ayahNumber),
  }),
);

export const translations = sqliteTable("translations", {
  id: text("id").primaryKey(),
  language: text("language").notNull(),
  name: text("name").notNull(),
  translator: text("translator"),
  source: text("source"),
});

export const ayahTranslations = sqliteTable(
  "ayah_translations",
  {
    id: text("id").primaryKey(),
    ayahId: integer("ayah_id").notNull().references(() => ayahs.id),
    translationId: text("translation_id").notNull().references(() => translations.id),
    text: text("text").notNull(),
  },
  (table) => ({
    ayahTranslationIdx: uniqueIndex("ayah_translations_unique_idx").on(table.ayahId, table.translationId),
  }),
);

export const reciters = sqliteTable("reciters", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  style: text("style"),
});

export const ayahAudio = sqliteTable(
  "ayah_audio",
  {
    id: text("id").primaryKey(),
    ayahId: integer("ayah_id").notNull().references(() => ayahs.id),
    reciterId: text("reciter_id").notNull().references(() => reciters.id),
    audioUrl: text("audio_url").notNull(),
    durationMs: integer("duration_ms"),
  },
  (table) => ({
    ayahReciterIdx: uniqueIndex("ayah_audio_unique_idx").on(table.ayahId, table.reciterId),
  }),
);
