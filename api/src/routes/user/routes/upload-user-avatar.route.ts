import type { FastifyInstance } from "fastify";
import type { UserController } from "@/controllers/user.controller";
import { errorResponseDTO, paramIdDTO, userSuccessResponseDTO } from "../dtos/user.schema";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { adaptRoute } from "@/adapters/fastify-route-adapter";

export function uploadUserAvatarRoute({ controller }: { controller: UserController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().patch(
      "/:id/avatar",
      {
        schema: {
          description: "Faz o upload da foto de avatar de um usuário",
          tags: ["Users"],
          params: paramIdDTO,
          consumes: ["multipart/form-data"],
          response: {
            200: userSuccessResponseDTO,
            404: errorResponseDTO,
          },
        },
      },
      adaptRoute(controller.uploadAvatar.bind(controller)),
    );
  };
}