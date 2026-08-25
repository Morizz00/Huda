import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { timestamps } from "./shared";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull().default(false),
  displayName: text("display_name"),
  authProvider: text("auth_provider").notNull(), // email | google | apple | anonymous
  isAnonymous: integer("is_anonymous", { mode: "boolean" }).notNull().default(false),
  ...timestamps,
});

export const userDevices = sqliteTable("user_devices", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  platform: text("platform").notNull(), // ios | android | web
  pushToken: text("push_token"),
  lastSeenAt: integer("last_seen_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const userSessions = sqliteTable("user_sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  deviceId: text("device_id"),
  tokenHash: text("token_hash").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const userPreferences = sqliteTable("user_preferences", {
  userId: text("user_id").primaryKey().references(() => users.id),
  language: text("language").notNull().default("en"),
  translationId: text("translation_id"),
  reciterId: text("reciter_id"),
  calculationMethod: text("calculation_method"),
  madhhab: text("madhhab"),
  latitude: real("latitude"),
  longitude: real("longitude"),
  timezone: text("timezone"),
  theme: text("theme").notNull().default("system"),
  fontSize: text("font_size").notNull().default("md"),
  notificationsEnabled: integer("notifications_enabled", { mode: "boolean" }).notNull().default(true),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const userSettings = sqliteTable("user_settings", {
  userId: text("user_id").primaryKey().references(() => users.id),
  syncEnabled: integer("sync_enabled", { mode: "boolean" }).notNull().default(true),
  analyticsEnabled: integer("analytics_enabled", { mode: "boolean" }).notNull().default(false),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});
