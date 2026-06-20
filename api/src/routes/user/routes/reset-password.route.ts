import type { FastifyInstance } from "fastify";
import type { UserController } from "@/controllers/user.controller";
import { errorDetailsResponseDTO, resetPasswordDTO, userSuccessResponseDTO } from "../dtos/user.schema";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function resetPasswordRoute({ controller }: { controller: UserController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().post(
      "/reset-password",
      {
        schema: {
          description: "Redefine a senha do usuário",
          tags: ["Users"],
          body: resetPasswordDTO,
          response: {
            200: userSuccessResponseDTO,
            404: errorDetailsResponseDTO,
          },
        },
      },
      controller.resetPassword.bind(controller),
    );
  };
}