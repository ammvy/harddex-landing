import z from "zod";

export const updateUserDTO = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserDTO>;