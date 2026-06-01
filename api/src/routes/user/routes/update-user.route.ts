import type { FastifyInstance } from "fastify";
import type { UserController } from "@/controllers/user.controller";
import { errorResponseDTO, paramIdDTO, updateUserDTO, userSuccessResponseDTO } from "../dtos/user.schema";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { adaptRoute } from "@/adapters/fastify-route-adapter";

export function updateUserRoute({ controller }: { controller: UserController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().put(
      "/:id",
      {
        schema: {
          description: "Atualiza os dados de um usuário existente",
          tags: ["Users"],
          params: paramIdDTO,
          body: updateUserDTO,
          response: {
            200: userSuccessResponseDTO,
            404: errorResponseDTO,
          },
        },
      },
      adaptRoute(controller.update.bind(controller)),
    );
  };
}