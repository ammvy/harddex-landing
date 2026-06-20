import type { FastifyInstance } from "fastify";
import type { TypeController } from "@/controllers/type.controller";
import { typeListSuccessResponseDTO, errorResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function getAllTypesRoute({ controller }: { controller: TypeController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get(
      "/",
      {
        schema: {
          description: "Retorna todos os tipos",
          tags: ["Types"],
          response: {
            200: typeListSuccessResponseDTO,
            400: errorResponseDTO,
          },
        },
      },
      controller.getAll.bind(controller),
    );
  };
}
