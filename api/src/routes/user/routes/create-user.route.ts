import type { FastifyInstance } from "fastify";
import type { UserController } from "@/controllers/user.controller";
import { createUserDTO, errorDetailsResponseDTO, userSuccessResponseDTO } from "../dtos/user.schema";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function createUserRoute(controller: UserController) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().post(
      "/",
      {
        schema: {
          description: "Cria um novo usuário",
          tags: ["Users"],
          body: createUserDTO,
          response: {
            201: userSuccessResponseDTO,
            400: errorDetailsResponseDTO,
          },
        },
      },
      controller.create.bind(controller),
    );
  };
}