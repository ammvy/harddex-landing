import type { FastifyInstance } from "fastify";
import type { UserController } from "@/controllers/user.controller";
import {
  createUserDTO,
  updateUserDTO,
  paramIdDTO,
  getAllUsersResponseDTO,
  userSuccessResponseDTO,
  errorResponseDTO,
  errorDetailsResponseDTO,
} from "./schemas/user.schema";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export function userRoutes(controller: UserController) {
  return async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get(
      "/users",
      {
        schema: {
          description: "Recupera a lista de todos os usuários",
          tags: ["Users"],
          response: {
            200: getAllUsersResponseDTO,
          },
        },
      },
      controller.getAll.bind(controller),
    );

    // GET /users/:id
    app.get(
      "/users/:id",
      {
        schema: {
          description: "Recupera um usuário pelo seu ID (UUID)",
          tags: ["Users"],
          params: paramIdDTO,
          response: {
            200: userSuccessResponseDTO,
            404: errorResponseDTO,
          },
        },
      },
      controller.getById.bind(controller),
    );

    // POST /users
    app.post(
      "/users",
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

    // PUT /users/:id
    app.put(
      "/users/:id",
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
      controller.update.bind(controller),
    );

    // DELETE /users/:id
    app.delete(
      "/users/:id",
      {
        schema: {
          description: "Remove um usuário e seu avatar associado do Storage",
          tags: ["Users"],
          params: paramIdDTO,
          response: {
            204: {
              type: "null",
              description: "Usuário removido com sucesso",
            },
            404: errorResponseDTO,
          },
        },
      },
      controller.delete.bind(controller),
    );

    // PATCH /users/:id/avatar
    app.patch(
      "/users/:id/avatar",
      {
        schema: {
          description: "Faz o upload da foto de avatar de um usuário",
          tags: ["Users"],
          params: paramIdDTO,
          consumes: ["multipart/form-data"],
          body: {
            type: "object",
            required: ["avatar"],
            properties: {
              avatar: {
                type: "string",
                format: "binary",
                description: "Arquivo de imagem do avatar (JPEG, PNG, etc.)",
              },
            },
          },
          response: {
            200: userSuccessResponseDTO,
            404: errorResponseDTO,
          },
        },
      },
      controller.uploadAvatar.bind(controller),
    );
  };
}
