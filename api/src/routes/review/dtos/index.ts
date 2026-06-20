import { z } from "zod";

export const paramIdDTO = z.object({
  id: z.coerce.number().int().positive(),
});

export const createReviewDTO = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(255),
  color: z.string().max(50).optional(),
});

export type CreateReviewInput = z.infer<typeof createReviewDTO>;

export const ReviewDTO = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string().nullable().optional(),
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
