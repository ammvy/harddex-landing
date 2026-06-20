import type { FastifyInstance } from "fastify";
import type { BrandController } from "@/controllers/brand.controller";
import { brandListSuccessResponseDTO, errorResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function getAllBrandsRoute({ controller }: { controller: BrandController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get(
      "/",
      {
        schema: {
          description: "Retorna todas as marcas",
          tags: ["Brands"],
          response: {
            200: brandListSuccessResponseDTO,
            400: errorResponseDTO,
          },
        },
      },
      controller.getAll.bind(controller),
    );
  };
}
