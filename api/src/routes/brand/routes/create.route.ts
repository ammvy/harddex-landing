import type { FastifyInstance } from "fastify";
import type { BrandController } from "@/controllers/brand.controller";
import { createBrandDTO, brandSuccessResponseDTO, errorResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function createBrandRoute({ controller }: { controller: BrandController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().post(
      "/",
      {
        schema: {
          description: "Cria uma nova marca",
          tags: ["Brands"],
          body: createBrandDTO,
          response: {
            201: brandSuccessResponseDTO,
            400: errorResponseDTO,
          },
        },
      },
      controller.create.bind(controller),
    );
  };
}
