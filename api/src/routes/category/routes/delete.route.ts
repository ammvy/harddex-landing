import type { FastifyInstance } from "fastify";
import type { CategoryController } from "@/controllers/category.controller";
import { errorResponseDTO, paramIdDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function deleteCategoryRoute({ controller }: { controller: CategoryController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().delete(
      "/:id",
      {
        schema: {
          description: "Deleta um category pelo seu ID",
          tags: ["Categorys"],
          params: paramIdDTO,
          response: {
            204: z.any(),
            404: errorResponseDTO,
          },
        },
      },
      controller.delete.bind(controller),
    );
  };
}