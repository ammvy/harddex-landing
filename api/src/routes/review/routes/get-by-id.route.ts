import type { FastifyInstance } from "fastify";
import type { ReviewController } from "@/controllers/review.controller";
import { errorResponseDTO, paramIdDTO, reviewSuccessResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function getReviewByIdRoute({ controller }: { controller: ReviewController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get(
      "/:id",
      {
        schema: {
          description: "Recupera uma avaliação pelo seu ID",
          tags: ["Reviews"],
          params: paramIdDTO,
          response: {
            200: reviewSuccessResponseDTO,
            404: errorResponseDTO,
          },
        },
      },
      controller.getById.bind(controller),
    );
  };
}