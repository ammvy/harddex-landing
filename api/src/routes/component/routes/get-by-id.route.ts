import type { FastifyInstance } from "fastify";
import type { ComponentController } from "@/controllers/component.controller";
import { errorResponseDTO, paramIdDTO, componentSuccessResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function getComponentByIdRoute({ controller }: { controller: ComponentController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get(
      "/:id",
      {
        schema: {
          description: "Recupera um component pelo seu ID",
          tags: ["Components"],
          params: paramIdDTO,
          response: {
            200: componentSuccessResponseDTO,
            404: errorResponseDTO,
          },
        },
      },
      controller.getById.bind(controller),
    );
  };
}