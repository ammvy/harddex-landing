import { relations } from "drizzle-orm";
import { users } from "./user.schema";
import { brands } from "./brand.schema";
import { categories } from "./category.schema";
import { manufacturers } from "./manufacturer.schema";
import { types } from "./type.schema";
import { products } from "./product.schema";
import { reviews } from "./review.schema";
import { components } from "./component.schema";
import { attachments } from "./attachment.schema";

export const usersRelations = relations(users, ({ many }) => ({
  reviews: many(reviews),
}));

export const brandsRelations = relations(brands, ({ many }) => ({
  products: many(products),
  attachments: many(attachments),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const manufacturersRelations = relations(manufacturers, ({ many }) => ({
  components: many(components),
  attachments: many(attachments),
}));

export const typesRelations = relations(types, ({ many }) => ({
  components: many(components),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  brand: one(brands, {
    fields: [products.brandId],
    references: [brands.id],
  }),
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  reviews: many(reviews),
  components: many(components),
  attachments: many(attachments),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
}));

export const componentsRelations = relations(components, ({ one, many }) => ({
  product: one(products, {
    fields: [components.productId],
    references: [products.id],
  }),
  type: one(types, {
    fields: [components.typeId],
    references: [types.id],
  }),
  manufacturer: one(manufacturers, {
    fields: [components.manufacturerId],
    references: [manufacturers.id],
  }),
  attachments: many(attachments),
}));

export const attachmentsRelations = relations(attachments, ({ one }) => ({
  brand: one(brands, {
    fields: [attachments.brandId],
    references: [brands.id],
  }),
  product: one(products, {
    fields: [attachments.productId],
    references: [products.id],
  }),
  component: one(components, {
    fields: [attachments.componentId],
    references: [components.id],
  }),
  manufacturer: one(manufacturers, {
    fields: [attachments.manufacturerId],
    references: [manufacturers.id],
  }),
}));
