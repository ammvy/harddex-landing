import type { FastifyInstance } from "fastify";
import type { UserController } from "@/controllers/user.controller";
import { errorResponseDTO, paramIdDTO, userSuccessResponseDTO } from "../dtos/user.schema";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { adaptRoute } from "@/adapters/fastify-route-adapter";

export function getUserByIdRoute({ controller }: { controller: UserController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get(
      "/:id",
      {
        schema: {
          description: "Recupera um usuário pelo seu ID (UUID)",
          tags: ["Users"],
          params: paramIdDTO,
          response: {
            200: userSuccessResponseDTO,
            404: errorResponseDTO,
          },
        },
      },
      adaptRoute(controller.getById.bind(controller)),
    );
  };
}