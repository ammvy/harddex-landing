import type { FastifyInstance } from "fastify";
import type { UserController } from "@/controllers/user.controller";
import { createUserRoute } from "./routes/create-user.route";
import { deleteUserRoute } from "./routes/delete-user.route";
import { getAllUsersRoute } from "./routes/get-all-users.route";
import { getUserByIdRoute } from "./routes/get-user-by-id.route";
import { updateUserRoute } from "./routes/update-user.route";
import { uploadUserAvatarRoute } from "./routes/upload-user-avatar.route";

export function userRoutes(controller: UserController) {
  return async (app: FastifyInstance) => {
    app.register(getAllUsersRoute(controller));
    app.register(getUserByIdRoute(controller));
    app.register(createUserRoute(controller));
    app.register(updateUserRoute(controller));
    app.register(deleteUserRoute(controller));
    app.register(uploadUserAvatarRoute(controller));
  };
}