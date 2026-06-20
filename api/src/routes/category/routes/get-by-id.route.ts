import type { FastifyInstance } from "fastify";
import type { CategoryController } from "@/controllers/category.controller";
import { errorResponseDTO, paramIdDTO, categorySuccessResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function getCategoryByIdRoute({ controller }: { controller: CategoryController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get(
      "/:id",
      {
        schema: {
          description: "Recupera um category pelo seu ID",
          tags: ["Categorys"],
          params: paramIdDTO,
          response: {
            200: categorySuccessResponseDTO,
            404: errorResponseDTO,
          },
        },
      },
      controller.getById.bind(controller),
    );
  };
}