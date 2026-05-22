import type { FastifyInstance } from "fastify";
import type { UserController } from "@/controllers/user.controller";
import { userRoutes } from "./user";

export function globalRoutes(controller: UserController) {
  return async (app: FastifyInstance) => {
    app.register(userRoutes(controller), { prefix: "/users" });
  };
}