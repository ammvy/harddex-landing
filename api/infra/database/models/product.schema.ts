import { pgTable, serial, varchar, text, doublePrecision, integer } from 'drizzle-orm/pg-core';
import { brands } from './brand.schema';
import { categories } from './category.schema';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  averagePrice: doublePrecision('average_price'),
  brandId: integer('brand_id').references(() => brands.id, { onDelete: 'set null' }),
  categoryId: integer('category_id').references(() => categories.id, { onDelete: 'set null' }),
});

export type ProductSelect = typeof products.$inferSelect;
export type ProductInsert = typeof products.$inferInsert;
