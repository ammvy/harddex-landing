import type { FastifyInstance } from "fastify";
import type { UserController } from "@/controllers/user.controller";
import { errorResponseDTO, paramIdDTO } from "../dtos/user.schema";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { adaptRoute } from "@/adapters/fastify-route-adapter";
import z from "zod";

export function deleteUserRoute({
  controller,
}: {
  controller: UserController;
}) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().delete(
      "/:id",
      {
        schema: {
          description: "Remove um usuário e seu avatar associado do Storage",
          tags: ["Users"],
          params: paramIdDTO,
          response: {
            204: z.void().describe("Usuário removido com sucesso"),
            404: errorResponseDTO,
          },
        },
      },
      adaptRoute(controller.delete.bind(controller)),
    );
  };
}
