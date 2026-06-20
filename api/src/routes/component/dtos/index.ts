import { z } from "zod";

export const paramIdDTO = z.object({
  id: z.coerce.number().int().positive(),
});

export const createComponentDTO = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(255),
  color: z.string().max(50).optional(),
});

export type CreateComponentInput = z.infer<typeof createComponentDTO>;

export const ComponentDTO = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string().nullable().optional(),
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
