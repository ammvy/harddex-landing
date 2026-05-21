import { z } from 'zod';

// Request DTOs
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

// Response DTOs
export const userResponseDTO = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  avatarUrl: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const getAllUsersResponseDTO = z.object({
  success: z.boolean(),
  data: z.array(userResponseDTO),
});

export const userSuccessResponseDTO = z.object({
  success: z.boolean(),
  data: userResponseDTO,
});

export const errorResponseDTO = z.object({
  success: z.boolean(),
  error: z.object({
    message: z.string(),
  }),
});

export const errorDetailsResponseDTO = z.object({
  success: z.boolean(),
  error: z.object({
    message: z.string(),
    details: z.record(z.any()).optional(),
  }),
});
