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

export const productSuccessResponseDTO = z.object({
  success: z.boolean(),
  data: productDTO,
});

export const productListSuccessResponseDTO = z.object({
  success: z.boolean(),
  data: z.array(productDTO),
});

export const errorResponseDTO = z.object({
  success: z.boolean(),
  error: z.string(),
});

export const updateProductDTO = createProductDTO.partial();
