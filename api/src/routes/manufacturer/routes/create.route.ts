import type { FastifyInstance } from "fastify";
import type { ManufacturerController } from "@/controllers/manufacturer.controller";
import { createManufacturerDTO, manufacturerSuccessResponseDTO, errorResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function createManufacturerRoute({ controller }: { controller: ManufacturerController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().post(
      "/",
      {
        schema: {
          description: "Cria uma nova categoria",
          tags: ["manufacturers"],
          body: createManufacturerDTO,
          response: {
            201: manufacturerSuccessResponseDTO,
            400: errorResponseDTO,
          },
        },
      },
      controller.create.bind(controller),
    );
  };
}
