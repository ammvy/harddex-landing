import type { FastifyInstance } from "fastify";
import type { UserController } from "@/controllers/user.controller";
import { authenticateUserDTO, errorDetailsResponseDTO, authenticateResponseDTO } from "../dtos/user.schema";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function authenticateUserRoute({ controller }: { controller: UserController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().post(
      "/authenticate",
      {
        schema: {
          description: "Autentica um usuário",
          tags: ["Users"],
          body: authenticateUserDTO,
          response: {
            200: authenticateResponseDTO,
            400: errorDetailsResponseDTO,
            404: errorDetailsResponseDTO,
          },
        },
      },
      controller.authenticate.bind(controller),
    );
  };
}