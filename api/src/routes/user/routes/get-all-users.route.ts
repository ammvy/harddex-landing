import type { FastifyInstance } from "fastify";
import type { UserController } from "@/controllers/user.controller";
import { getAllUsersResponseDTO } from "../dtos/user.schema";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { adaptRoute } from "@/adapters/fastify-route-adapter";

export function getAllUsersRoute({ controller }: { controller: UserController }) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get(
      "/",
      {
        schema: {
          description: "Recupera a lista de todos os usuários",
          tags: ["Users"],
          response: {
            200: getAllUsersResponseDTO,
          },
        },
      },
      adaptRoute(controller.getAll.bind(controller)),
    );
  };
}