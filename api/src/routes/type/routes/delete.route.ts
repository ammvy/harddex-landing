import type { FastifyInstance } from "fastify";
import type { TypeController } from "@/controllers/type.controller";
import { errorResponseDTO, paramIdDTO } from "../dtos";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function deleteTypeRoute({ controller }: { controller: TypeController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().delete(
      "/:id",
      {
        schema: {
          description: "Deleta um type pelo seu ID",
          tags: ["Types"],
          params: paramIdDTO,
          response: {
            204: z.any(),
            404: errorResponseDTO,
          },
        },
      },
      controller.delete.bind(controller),
    );
  };
}