import { z } from "zod";

export const createUserDTO = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  style: z.enum(['BASIC', 'INTERMEDIATE', 'ADVANCED', 'GAMER', 'PROFESSIONAL']).optional(),
  permission: z.enum(['ADMIN', 'USER', 'CURATOR']).optional(),
});

export type CreateUserInput = z.infer<typeof createUserDTO>;

export const authenticateUserDTO = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type AuthenticateUserInput = z.infer<typeof authenticateUserDTO>;

export const requestPasswordResetDTO = z.object({
  email: z.string().email("Invalid email"),
});

export type RequestPasswordResetInput = z.infer<typeof requestPasswordResetDTO>;

export const resetPasswordDTO = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type ResetPasswordInput = z.infer<typeof resetPasswordDTO>;