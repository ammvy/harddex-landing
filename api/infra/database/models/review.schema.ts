import { pgTable, serial, doublePrecision, text, integer } from 'drizzle-orm/pg-core';
import { users } from './user.schema';
import { products } from './product.schema';

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  rating: doublePrecision('rating').notNull(),
  comment: text('comment'),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  productId: integer('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
});

export type ReviewSelect = typeof reviews.$inferSelect;
export type ReviewInsert = typeof reviews.$inferInsert;
