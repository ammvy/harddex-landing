import type { FastifyInstance } from "fastify";
import type { UserController } from "@/controllers/user.controller";
import { errorDetailsResponseDTO, requestPasswordResetDTO, userSuccessResponseDTO } from "../dtos/user.schema";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { adaptRoute } from "@/adapters/fastify-route-adapter";

export function requestPasswordResetRoute({ controller }: { controller: UserController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().post(
      "/request-password-reset",
      {
        schema: {
          description: "Solicita redefinição de senha",
          tags: ["Users"],
          body: requestPasswordResetDTO,
          response: {
            200: userSuccessResponseDTO,
            404: errorDetailsResponseDTO,
          },
        },
      },
      adaptRoute(controller.requestPasswordReset.bind(controller)),
    );
  };
}