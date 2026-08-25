import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { timestamps, syncFields } from "./shared";
import { users } from "./users";
import { surahs, ayahs } from "./quran";

export const collections = sqliteTable("collections", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  ...timestamps,
  ...syncFields,
});

export const bookmarks = sqliteTable("bookmarks", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  ayahId: integer("ayah_id").notNull().references(() => ayahs.id),
  collectionId: text("collection_id").references(() => collections.id),
  color: text("color"),
  ...timestamps,
  ...syncFields,
});

export const notes = sqliteTable("notes", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  ayahId: integer("ayah_id").notNull().references(() => ayahs.id),
  body: text("body").notNull(),
  ...timestamps,
  ...syncFields,
});

export const readingHistory = sqliteTable("reading_history", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  ayahId: integer("ayah_id").notNull().references(() => ayahs.id),
  readAt: integer("read_at", { mode: "timestamp" }).notNull(),
});

export const readingProgress = sqliteTable("reading_progress", {
  userId: text("user_id").primaryKey().references(() => users.id),
  lastSurahId: integer("last_surah_id").references(() => surahs.id),
  lastAyahId: integer("last_ayah_id").references(() => ayahs.id),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ...syncFields,
});

export const khatmPlans = sqliteTable("khatm_plans", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  startDate: integer("start_date", { mode: "timestamp" }).notNull(),
  targetDate: integer("target_date", { mode: "timestamp" }),
  dailyTargetPages: integer("daily_target_pages"),
  completedPages: integer("completed_pages").notNull().default(0),
  status: text("status").notNull().default("active"), // active | completed | abandoned
  ...timestamps,
  ...syncFields,
});
