import type { FastifyInstance } from "fastify";
import type { ComponentController } from "@/controllers/component.controller";
import { componentListSuccessResponseDTO, errorResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function getAllComponentsRoute({ controller }: { controller: ComponentController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get(
      "/",
      {
        schema: {
          description: "Retorna todas as categorias",
          tags: ["components"],
          response: {
            200: componentListSuccessResponseDTO,
            400: errorResponseDTO,
          },
        },
      },
      controller.getAll.bind(controller),
    );
  };
}
