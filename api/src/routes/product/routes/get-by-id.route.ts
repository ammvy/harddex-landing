import type { FastifyInstance } from "fastify";
import type { ProductController } from "@/controllers/product.controller";
import { errorResponseDTO, paramIdDTO, productSuccessResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function getProductByIdRoute({ controller }: { controller: ProductController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get(
      "/:id",
      {
        schema: {
          description: "Recupera um product pelo seu ID",
          tags: ["Products"],
          params: paramIdDTO,
          response: {
            200: productSuccessResponseDTO,
            404: errorResponseDTO,
          },
        },
      },
      controller.getById.bind(controller),
    );
  };
}