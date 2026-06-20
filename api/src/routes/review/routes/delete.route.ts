import type { FastifyInstance } from "fastify";
import type { ReviewController } from "@/controllers/review.controller";
import { errorResponseDTO, paramIdDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function deleteReviewRoute({ controller }: { controller: ReviewController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().delete(
      "/:id",
      {
        schema: {
          description: "Deleta uma avaliação pelo seu ID",
          tags: ["Reviews"],
          params: paramIdDTO,
          response: {
            204: z.void().describe("Avaliação removida com sucesso"),
            404: errorResponseDTO,
          },
        },
      },
      controller.delete.bind(controller),
    );
  };
}