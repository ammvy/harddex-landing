import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core';
import { brands } from './brand.schema';
import { products } from './product.schema';
import { components } from './component.schema';
import { manufacturers } from './manufacturer.schema';

export const attachments = pgTable('attachments', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  url: varchar('url', { length: 255 }).notNull(),
  brandId: integer('brand_id').references(() => brands.id, { onDelete: 'cascade' }),
  productId: integer('product_id').references(() => products.id, { onDelete: 'cascade' }),
  componentId: integer('component_id').references(() => components.id, { onDelete: 'cascade' }),
  manufacturerId: integer('manufacturer_id').references(() => manufacturers.id, { onDelete: 'cascade' }),
});

export type AttachmentSelect = typeof attachments.$inferSelect;
export type AttachmentInsert = typeof attachments.$inferInsert;
