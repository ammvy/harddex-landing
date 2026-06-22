import type { FastifyInstance } from "fastify";
import type { BrandController } from "@/controllers/brand.controller";
import { errorResponseDTO, paramIdDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function deleteBrandRoute({ controller }: { controller: BrandController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().delete(
      "/:id",
      {
        schema: {
          description: "Deleta um brand pelo seu ID",
          tags: ["Brands"],
          params: paramIdDTO,
          response: {
            200: z.object({
              success: z.boolean(),
              message: z.string(),
            }).describe("Marca removida com sucesso"),
            404: errorResponseDTO,
          },
        },
      },
      controller.delete.bind(controller),
    );
  };
}