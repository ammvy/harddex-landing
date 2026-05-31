import type { FastifyInstance } from "fastify";
import type { UserController } from "@/controllers/user.controller";
import { userRoutes } from "./user";
import { anaRoutes } from "./ana";
import { AnaController } from "@/controllers/ana.controller";

export function globalRoutes({ userController, anaController }: { userController: UserController, anaController: AnaController }) {
  return async (app: FastifyInstance) => {
    app.register(userRoutes({ controller: userController }), { prefix: "/users" });
    app.register(anaRoutes({ controller: anaController }), { prefix: "/ana" })
  };
}