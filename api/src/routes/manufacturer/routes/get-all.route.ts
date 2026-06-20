import type { FastifyInstance } from "fastify";
import type { ManufacturerController } from "@/controllers/manufacturer.controller";
import { manufacturerListSuccessResponseDTO, errorResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function getAllManufacturersRoute({ controller }: { controller: ManufacturerController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get(
      "/",
      {
        schema: {
          description: "Retorna todos os fabricantes",
          tags: ["Manufacturers"],
          response: {
            200: manufacturerListSuccessResponseDTO,
            400: errorResponseDTO,
          },
        },
      },
      controller.getAll.bind(controller),
    );
  };
}
