import { pgTable, pgEnum, serial, varchar } from "drizzle-orm/pg-core";

export const userStyleEnum = pgEnum("user_style_enum", [
  "BASIC",
  "INTERMEDIATE",
  "ADVANCED",
  "GAMER",
  "PROFESSIONAL",
  "Remote work",
  "File / Media",
  "Mobility",
  "Light travel",
]);

export const permissionEnum = pgEnum("permission_enum", [
  "ADMIN",
  "USER",
  "CURATOR",
]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  style: userStyleEnum("style").default("BASIC"),
  permission: permissionEnum("permission").default("USER"),
});

export type UserSelect = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;
