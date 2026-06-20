import type { FastifyInstance } from "fastify";
import type { ProductController } from "@/controllers/product.controller";
import { productListSuccessResponseDTO, errorResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function getAllProductsRoute({ controller }: { controller: ProductController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get(
      "/",
      {
        schema: {
          description: "Retorna todos os produtos",
          tags: ["Products"],
          response: {
            200: productListSuccessResponseDTO,
            400: errorResponseDTO,
          },
        },
      },
      controller.getAll.bind(controller),
    );
  };
}
