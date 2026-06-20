import type { FastifyInstance } from "fastify";
import type { TypeController } from "@/controllers/type.controller";
import { createTypeDTO, typeSuccessResponseDTO, errorResponseDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function createTypeRoute({ controller }: { controller: TypeController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().post(
      "/",
      {
        schema: {
          description: "Cria uma nova categoria",
          tags: ["types"],
          body: createTypeDTO,
          response: {
            201: typeSuccessResponseDTO,
            400: errorResponseDTO,
          },
        },
      },
      controller.create.bind(controller),
    );
  };
}
