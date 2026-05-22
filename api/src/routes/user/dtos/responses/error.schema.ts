import z from "zod";

export const errorResponseDTO = z.object({
  success: z.boolean(),
  error: z.object({
    message: z.string(),
  }),
});