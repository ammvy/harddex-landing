import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const manufacturers = pgTable('manufacturers', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
});

export type ManufacturerSelect = typeof manufacturers.$inferSelect;
export type ManufacturerInsert = typeof manufacturers.$inferInsert;
