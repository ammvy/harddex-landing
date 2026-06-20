import { z } from "zod";

export const paramIdDTO = z.object({
  id: z.coerce.number().int().positive(),
});

export const createBrandDTO = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(255),
});

export type CreateBrandInput = z.infer<typeof createBrandDTO>;

export const brandDTO = z.object({
  id: z.number(),
  name: z.string(),
});

export const brandSuccessResponseDTO = z.object({
  success: z.boolean(),
  data: brandDTO,
});

export const brandListSuccessResponseDTO = z.object({
  success: z.boolean(),
  data: z.array(brandDTO),
});

export const errorResponseDTO = z.object({
  success: z.boolean(),
  error: z.string(),
});

export const updateBrandDTO = createBrandDTO.partial();
