import type { FastifyInstance } from "fastify";
import type { ProductController } from "@/controllers/product.controller";
import { errorResponseDTO, paramIdDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function deleteProductRoute({ controller }: { controller: ProductController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().delete(
      "/:id",
      {
        schema: {
          description: "Deleta um product pelo seu ID",
          tags: ["Products"],
          params: paramIdDTO,
          response: {
            204: z.void().describe("Produto removido com sucesso"),
            404: errorResponseDTO,
          },
        },
      },
      controller.delete.bind(controller),
    );
  };
}