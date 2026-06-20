import type { FastifyInstance } from "fastify";
import type { TypeController } from "@/controllers/type.controller";
import { errorResponseDTO, paramIdDTO, typeSuccessResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function getTypeByIdRoute({ controller }: { controller: TypeController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get(
      "/:id",
      {
        schema: {
          description: "Recupera um tipo pelo seu ID",
          tags: ["Types"],
          params: paramIdDTO,
          response: {
            200: typeSuccessResponseDTO,
            404: errorResponseDTO,
          },
        },
      },
      controller.getById.bind(controller),
    );
  };
}