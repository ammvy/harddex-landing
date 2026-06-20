import { z } from "zod";

export const paramIdDTO = z.object({
  id: z.coerce.number().int().positive(),
});

export const createManufacturerDTO = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(255),
});

export type CreateManufacturerInput = z.infer<typeof createManufacturerDTO>;

export const ManufacturerDTO = z.object({
  id: z.number(),
  name: z.string(),
});

export const manufacturerSuccessResponseDTO = z.object({
  success: z.boolean(),
  data: ManufacturerDTO,
});

export const manufacturerListSuccessResponseDTO = z.object({
  success: z.boolean(),
  data: z.array(ManufacturerDTO),
});

export const errorResponseDTO = z.object({
  success: z.boolean(),
  error: z.string(),
});

export const updateManufacturerDTO = createManufacturerDTO.partial();
