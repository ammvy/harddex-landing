import type { FastifyInstance } from "fastify";
import type { CategoryController } from "@/controllers/category.controller";
import { createCategoryDTO, categorySuccessResponseDTO, errorResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function createCategoryRoute({ controller }: { controller: CategoryController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().post(
      "/",
      {
        schema: {
          description: "Cria uma nova categoria",
          tags: ["Categories"],
          body: createCategoryDTO,
          response: {
            201: categorySuccessResponseDTO,
            400: errorResponseDTO,
          },
        },
      },
      controller.create.bind(controller),
    );
  };
}
