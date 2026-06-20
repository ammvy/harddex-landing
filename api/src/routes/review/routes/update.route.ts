import type { FastifyInstance } from "fastify";
import type { ReviewController } from "@/controllers/review.controller";
import { errorResponseDTO, paramIdDTO, updateReviewDTO, reviewSuccessResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function updateReviewRoute({ controller }: { controller: ReviewController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().put(
      "/:id",
      {
        schema: {
          description: "Atualiza uma avaliação pelo seu ID",
          tags: ["Reviews"],
          params: paramIdDTO,
          body: updateReviewDTO,
          response: {
            200: reviewSuccessResponseDTO,
            404: errorResponseDTO,
          },
        },
      },
      controller.update.bind(controller),
    );
  };
}