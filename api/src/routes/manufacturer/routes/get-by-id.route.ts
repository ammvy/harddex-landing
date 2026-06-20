import type { FastifyInstance } from "fastify";
import type { ManufacturerController } from "@/controllers/manufacturer.controller";
import { errorResponseDTO, paramIdDTO, manufacturerSuccessResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function getManufacturerByIdRoute({ controller }: { controller: ManufacturerController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get(
      "/:id",
      {
        schema: {
          description: "Recupera um fabricante pelo seu ID",
          tags: ["Manufacturers"],
          params: paramIdDTO,
          response: {
            200: manufacturerSuccessResponseDTO,
            404: errorResponseDTO,
          },
        },
      },
      controller.getById.bind(controller),
    );
  };
}