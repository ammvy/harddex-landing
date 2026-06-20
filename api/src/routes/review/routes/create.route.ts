import type { FastifyInstance } from "fastify";
import type { ReviewController } from "@/controllers/review.controller";
import { createReviewDTO, reviewSuccessResponseDTO, errorResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function createReviewRoute({ controller }: { controller: ReviewController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().post(
      "/",
      {
        schema: {
          description: "Cria uma nova categoria",
          tags: ["reviews"],
          body: createReviewDTO,
          response: {
            201: reviewSuccessResponseDTO,
            400: errorResponseDTO,
          },
        },
      },
      controller.create.bind(controller),
    );
  };
}
