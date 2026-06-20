import { z } from "zod";

export const paramIdDTO = z.object({
  id: z.coerce.number().int().positive(),
});

export const createComponentDTO = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(255),
  specification: z.unknown().optional(),
  description: z.string().max(65535).optional().nullable(),
  averagePrice: z.number().positive().optional().nullable(),
  productId: z.number().int().positive(),
  typeId: z.number().int().positive().optional().nullable(),
  manufacturerId: z.number().int().positive().optional().nullable(),
});

export type CreateComponentInput = z.infer<typeof createComponentDTO>;

export const ComponentDTO = z.object({
  id: z.number(),
  name: z.string(),
  specification: z.unknown().nullable(),
  description: z.string().nullable(),
  averagePrice: z.number().nullable(),
  productId: z.number(),
  typeId: z.number().nullable(),
  manufacturerId: z.number().nullable(),
});

export const componentSuccessResponseDTO = z.object({
  success: z.boolean(),
  data: ComponentDTO,
});

export const componentListSuccessResponseDTO = z.object({
  success: z.boolean(),
  data: z.array(ComponentDTO),
});

export const errorResponseDTO = z.object({
  success: z.boolean(),
  error: z.string(),
});

export const updateComponentDTO = createComponentDTO.partial();
