import type { FastifyInstance } from "fastify";
import type { TypeController } from "@/controllers/type.controller";
import { errorResponseDTO, paramIdDTO, updateTypeDTO, typeSuccessResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function updateTypeRoute({ controller }: { controller: TypeController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().put(
      "/:id",
      {
        schema: {
          description: "Atualiza um type pelo seu ID",
          tags: ["Types"],
          params: paramIdDTO,
          body: updateTypeDTO,
          response: {
            200: typeSuccessResponseDTO,
            404: errorResponseDTO,
          },
        },
      },
      controller.update.bind(controller),
    );
  };
}