import type { FastifyInstance } from "fastify";
import type { UserController } from "@/controllers/user.controller";
import { authenticateUserRoute } from "./routes/authenticate-user.route";
import { createUserRoute } from "./routes/create-user.route";
import { deleteUserRoute } from "./routes/delete-user.route";
import { getAllUsersRoute } from "./routes/get-all-users.route";
import { getUserByIdRoute } from "./routes/get-user-by-id.route";
import { getMeRoute } from "./routes/get-me.route";
import { requestPasswordResetRoute } from "./routes/request-password-reset.route";
import { resetPasswordRoute } from "./routes/reset-password.route";
import { updateUserRoute } from "./routes/update-user.route";

export function userRoutes({ controller }: { controller: UserController }) {
  return async (app: FastifyInstance) => {
    app.register(getAllUsersRoute({ controller }));
    app.register(getMeRoute({ controller }));
    app.register(getUserByIdRoute({ controller }));
    app.register(createUserRoute({ controller }));
    app.register(authenticateUserRoute({ controller }));
    app.register(requestPasswordResetRoute({ controller }));
    app.register(resetPasswordRoute({ controller }));
    app.register(updateUserRoute({ controller }));
    app.register(deleteUserRoute({ controller }));
  };
}