import type { FastifyInstance } from "fastify";
import type { ComponentController } from "@/controllers/component.controller";
import { errorResponseDTO, paramIdDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function deleteComponentRoute({ controller }: { controller: ComponentController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().delete(
      "/:id",
      {
        schema: {
          description: "Deleta um componente pelo seu ID",
          tags: ["Components"],
          params: paramIdDTO,
          response: {
            204: z.void().describe("Componente removido com sucesso"),
            404: errorResponseDTO,
          },
        },
      },
      controller.delete.bind(controller),
    );
  };
}