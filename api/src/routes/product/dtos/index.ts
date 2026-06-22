import { z } from "zod";

export const paramIdDTO = z.object({
  id: z.coerce.number().int().positive(),
});

export const createProductDTO = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(255),
  description: z.string().optional(),
  averagePrice: z.number().positive().optional(),
  brandId: z.number().int().positive().optional(),
  categoryId: z.number().int().positive().optional(),
});

export type CreateProductInput = z.infer<typeof createProductDTO>;

export const productDTO = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable().optional(),
  averagePrice: z.number().nullable().optional(),
  brandId: z.number().nullable().optional(),
  categoryId: z.number().nullable().optional(),
});

export const brandDTO = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable().optional(),
});

export const categoryDTO = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable().optional(),
});

export const attachmentDTO = z.object({
  id: z.number(),
  url: z.string(),
  productId: z.number(),
});

export const componentTypeDTO = z.object({
  id: z.number(),
  name: z.string(),
});

export const componentDTO = z.object({
  id: z.number(),
  name: z.string(),
  specification: z.any().nullable().optional(),
  description: z.string().nullable().optional(),
  averagePrice: z.number().nullable().optional(),
  productId: z.number(),
  typeId: z.number().nullable().optional(),
  manufacturerId: z.number().nullable().optional(),
  type: componentTypeDTO.nullable().optional(),
});

export const productDetailedDTO = productDTO.extend({
  brand: brandDTO.nullable().optional(),
  category: categoryDTO.nullable().optional(),
  attachments: z.array(attachmentDTO).optional(),
  components: z.array(componentDTO).optional(),
});

export const getAllProductsQueryDTO = z.object({
  detailed: z.preprocess((val) => val === "true" || val === true, z.boolean()).optional(),
});

export const productSuccessResponseDTO = z.object({
  success: z.boolean(),
  data: productDetailedDTO,
});

export const productListSuccessResponseDTO = z.object({
  success: z.boolean(),
  data: z.array(productDetailedDTO),
});

export const errorResponseDTO = z.object({
  success: z.boolean(),
  error: z.string(),
});

export const updateProductDTO = createProductDTO.partial();
