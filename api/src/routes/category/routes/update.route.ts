import type { FastifyInstance } from "fastify";
import type { CategoryController } from "@/controllers/category.controller";
import { errorResponseDTO, paramIdDTO, updateCategoryDTO, categorySuccessResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function updateCategoryRoute({ controller }: { controller: CategoryController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().put(
      "/:id",
      {
        schema: {
          description: "Atualiza um category pelo seu ID",
          tags: ["Categorys"],
          params: paramIdDTO,
          body: updateCategoryDTO,
          response: {
            200: categorySuccessResponseDTO,
            404: errorResponseDTO,
          },
        },
      },
      controller.update.bind(controller),
    );
  };
}