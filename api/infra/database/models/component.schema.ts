import { pgTable, serial, varchar, text, doublePrecision, integer } from 'drizzle-orm/pg-core';
import { products } from './product.schema';
import { types } from './type.schema';
import { manufacturers } from './manufacturer.schema';

export const components = pgTable('components', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  specification: text('specification'),
  averagePrice: doublePrecision('average_price'),
  productId: integer('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  typeId: integer('type_id').references(() => types.id, { onDelete: 'set null' }),
  manufacturerId: integer('manufacturer_id').references(() => manufacturers.id, { onDelete: 'set null' }),
});

export type ComponentSelect = typeof components.$inferSelect;
export type ComponentInsert = typeof components.$inferInsert;
