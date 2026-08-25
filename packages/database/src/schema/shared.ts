import { text, integer } from "drizzle-orm/sqlite-core";

export const timestamps = {
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
};

// Sync Engine fields (PLAN.md #34) — required on every table that
// participates in client/server synchronization.
export const syncFields = {
  version: integer("version").notNull().default(1),
  deviceId: text("device_id"),
  operationId: text("operation_id"),
};
