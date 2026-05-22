import z from "zod";

export const errorDetailsResponseDTO = z.object({
  success: z.boolean(),
  error: z.object({
    message: z.string(),
    details: z.record(z.any(), z.any()).optional(),
  }),
});