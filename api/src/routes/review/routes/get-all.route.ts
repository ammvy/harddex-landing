import type { FastifyInstance } from "fastify";
import type { ReviewController } from "@/controllers/review.controller";
import { reviewListSuccessResponseDTO, errorResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function getAllReviewsRoute({ controller }: { controller: ReviewController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get(
      "/",
      {
        schema: {
          description: "Retorna todas as avaliações",
          tags: ["Reviews"],
          response: {
            200: reviewListSuccessResponseDTO,
            400: errorResponseDTO,
          },
        },
      },
      controller.getAll.bind(controller),
    );
  };
}
