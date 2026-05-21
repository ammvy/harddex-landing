import { z } from 'zod';

export const createUserDTO = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
});

export const updateUserDTO = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
});

export const paramIdDTO = z.object({
  id: z.string().uuid('Invalid UUID'),
});

export type CreateUserInput = z.infer<typeof createUserDTO>;
export type UpdateUserInput = z.infer<typeof updateUserDTO>;
