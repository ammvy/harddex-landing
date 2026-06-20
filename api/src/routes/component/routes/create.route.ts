import type { FastifyInstance } from "fastify";
import type { ComponentController } from "@/controllers/component.controller";
import { createComponentDTO, componentSuccessResponseDTO, errorResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function createComponentRoute({ controller }: { controller: ComponentController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().post(
      "/",
      {
        schema: {
          description: "Cria uma nova categoria",
          tags: ["components"],
          body: createComponentDTO,
          response: {
            201: componentSuccessResponseDTO,
            400: errorResponseDTO,
          },
        },
      },
      controller.create.bind(controller),
    );
  };
}
