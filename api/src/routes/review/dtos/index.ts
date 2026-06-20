import { z } from "zod";

export const paramIdDTO = z.object({
  id: z.coerce.number().int().positive(),
});

export const createReviewDTO = z.object({
  rating: z.number().min(0).max(5),
  comment: z.string().optional().nullable(),
  userId: z.number().int().positive(),
  productId: z.number().int().positive(),
});

export type CreateReviewInput = z.infer<typeof createReviewDTO>;

export const ReviewDTO = z.object({
  id: z.number(),
  rating: z.number(),
  comment: z.string().nullable(),
  userId: z.number(),
  productId: z.number(),
});

export const reviewSuccessResponseDTO = z.object({
  success: z.boolean(),
  data: ReviewDTO,
});

export const reviewListSuccessResponseDTO = z.object({
  success: z.boolean(),
  data: z.array(ReviewDTO),
});

export const errorResponseDTO = z.object({
  success: z.boolean(),
  error: z.string(),
});

export const updateReviewDTO = createReviewDTO.partial();
