import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const brands = pgTable('brands', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
});

export type BrandSelect = typeof brands.$inferSelect;
export type BrandInsert = typeof brands.$inferInsert;
