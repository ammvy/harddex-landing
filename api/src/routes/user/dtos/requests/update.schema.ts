import z from "zod";

export const updateUserDTO = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  style: z.enum(['BASIC', 'INTERMEDIATE', 'ADVANCED', 'GAMER', 'PROFESSIONAL']).optional(),
  permission: z.enum(['ADMIN', 'USER', 'CURATOR']).optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserDTO>;