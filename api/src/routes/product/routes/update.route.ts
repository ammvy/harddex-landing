import type { FastifyInstance } from "fastify";
import type { ProductController } from "@/controllers/product.controller";
import { errorResponseDTO, paramIdDTO, updateProductDTO, productSuccessResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function updateProductRoute({ controller }: { controller: ProductController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().put(
      "/:id",
      {
        schema: {
          description: "Atualiza um product pelo seu ID",
          tags: ["Products"],
          params: paramIdDTO,
          body: updateProductDTO,
          response: {
            200: productSuccessResponseDTO,
            404: errorResponseDTO,
          },
        },
      },
      controller.update.bind(controller),
    );
  };
}