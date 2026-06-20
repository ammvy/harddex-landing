import { z } from "zod";

export const paramIdDTO = z.object({
  id: z.coerce.number().int().positive(),
});

export const createCategoryDTO = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(255),
  color: z.string().max(50).optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategoryDTO>;

export const categoryDTO = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string().nullable().optional(),
});

export const categorySuccessResponseDTO = z.object({
  success: z.boolean(),
  data: categoryDTO,
});

export const categoryListSuccessResponseDTO = z.object({
  success: z.boolean(),
  data: z.array(categoryDTO),
});

export const errorResponseDTO = z.object({
  success: z.boolean(),
  error: z.string(),
});

export const updateCategoryDTO = createCategoryDTO.partial();
