import { z } from "zod";

export const paramIdDTO = z.object({
  id: z.coerce.number().int().positive(),
});

export const createTypeDTO = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(255),
  color: z.string().max(50).optional(),
});

export type CreateTypeInput = z.infer<typeof createTypeDTO>;

export const TypeDTO = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string().nullable().optional(),
});

export const typeSuccessResponseDTO = z.object({
  success: z.boolean(),
  data: TypeDTO,
});

export const typeListSuccessResponseDTO = z.object({
  success: z.boolean(),
  data: z.array(TypeDTO),
});

export const errorResponseDTO = z.object({
  success: z.boolean(),
  error: z.string(),
});

export const updateTypeDTO = createTypeDTO.partial();
