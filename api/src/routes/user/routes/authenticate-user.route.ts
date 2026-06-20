import type { FastifyInstance } from "fastify";
import type { UserController } from "@/controllers/user.controller";
import { authenticateUserDTO, errorDetailsResponseDTO, userSuccessResponseDTO } from "../dtos/user.schema";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { adaptRoute } from "@/adapters/fastify-route-adapter";

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
            200: userSuccessResponseDTO,
            400: errorDetailsResponseDTO,
            404: errorDetailsResponseDTO,
          },
        },
      },
      adaptRoute(controller.authenticate.bind(controller)),
    );
  };
}