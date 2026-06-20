import type { FastifyInstance } from "fastify";
import type { ComponentController } from "@/controllers/component.controller";
import { errorResponseDTO, paramIdDTO, updateComponentDTO, componentSuccessResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function updateComponentRoute({ controller }: { controller: ComponentController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().put(
      "/:id",
      {
        schema: {
          description: "Atualiza um component pelo seu ID",
          tags: ["Components"],
          params: paramIdDTO,
          body: updateComponentDTO,
          response: {
            200: componentSuccessResponseDTO,
            404: errorResponseDTO,
          },
        },
      },
      controller.update.bind(controller),
    );
  };
}