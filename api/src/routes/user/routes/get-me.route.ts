import type { FastifyInstance } from "fastify";
import type { UserController } from "@/controllers/user.controller";
import { errorResponseDTO, userSuccessResponseDTO } from "../dtos/user.schema";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function getMeRoute({ controller }: { controller: UserController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get(
      "/me",
      {
        onRequest: [async (request) => {
          await request.jwtVerify();
        }],
        schema: {
          description: "Recupera o usuário autenticado atual",
          tags: ["Users"],
          response: {
            200: userSuccessResponseDTO,
            401: errorResponseDTO,
            404: errorResponseDTO,
          },
        },
      },
      controller.getMe.bind(controller),
    );
  };
}
