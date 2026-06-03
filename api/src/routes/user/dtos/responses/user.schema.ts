import z from "zod";

// Response DTOs
export const userResponseDTO = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  style: z.string().nullable(),
  permission: z.string().nullable(),
});
