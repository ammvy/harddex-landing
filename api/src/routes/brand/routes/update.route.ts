import type { FastifyInstance } from "fastify";
import type { BrandController } from "@/controllers/brand.controller";
import { errorResponseDTO, paramIdDTO, updateBrandDTO, brandSuccessResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function updateBrandRoute({ controller }: { controller: BrandController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().put(
      "/:id",
      {
        schema: {
          description: "Atualiza um brand pelo seu ID",
          tags: ["Brands"],
          params: paramIdDTO,
          body: updateBrandDTO,
          response: {
            200: brandSuccessResponseDTO,
            404: errorResponseDTO,
          },
        },
      },
      controller.update.bind(controller),
    );
  };
}