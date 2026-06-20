import type { FastifyInstance } from "fastify";
import type { ManufacturerController } from "@/controllers/manufacturer.controller";
import { errorResponseDTO, paramIdDTO, updateManufacturerDTO, manufacturerSuccessResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function updateManufacturerRoute({ controller }: { controller: ManufacturerController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().put(
      "/:id",
      {
        schema: {
          description: "Atualiza um fabricante pelo seu ID",
          tags: ["Manufacturers"],
          params: paramIdDTO,
          body: updateManufacturerDTO,
          response: {
            200: manufacturerSuccessResponseDTO,
            404: errorResponseDTO,
          },
        },
      },
      controller.update.bind(controller),
    );
  };
}