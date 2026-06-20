import type { FastifyInstance } from "fastify";
import type { BrandController } from "@/controllers/brand.controller";
import { errorResponseDTO, paramIdDTO, brandSuccessResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function getBrandByIdRoute({ controller }: { controller: BrandController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get(
      "/:id",
      {
        schema: {
          description: "Recupera um brand pelo seu ID",
          tags: ["Brands"],
          params: paramIdDTO,
          response: {
            200: brandSuccessResponseDTO,
            404: errorResponseDTO,
          },
        },
      },
      controller.getById.bind(controller),
    );
  };
}