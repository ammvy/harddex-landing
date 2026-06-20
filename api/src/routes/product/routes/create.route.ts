import type { FastifyInstance } from "fastify";
import type { ProductController } from "@/controllers/product.controller";
import { createProductDTO, productSuccessResponseDTO, errorResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function createProductRoute({ controller }: { controller: ProductController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().post(
      "/",
      {
        schema: {
          description: "Cria um novo produto",
          tags: ["Products"],
          body: createProductDTO,
          response: {
            201: productSuccessResponseDTO,
            400: errorResponseDTO,
          },
        },
      },
      controller.create.bind(controller),
    );
  };
}
