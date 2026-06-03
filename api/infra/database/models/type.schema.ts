import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const types = pgTable('types', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  color: varchar('color', { length: 50 }),
});

export type TypeSelect = typeof types.$inferSelect;
export type TypeInsert = typeof types.$inferInsert;
