import type { FastifyInstance } from "fastify";
import type { TypeController } from "@/controllers/type.controller";
import { createTypeRoute } from "./routes/create.route";
import { getAllTypesRoute } from "./routes/get-all.route";
import { getTypeByIdRoute } from "./routes/get-by-id.route";
import { updateTypeRoute } from "./routes/update.route";
import { deleteTypeRoute } from "./routes/delete.route";

export function typeRoutes({ controller }: { controller: TypeController }) {
  return async (app: FastifyInstance) => {
    app.register(createTypeRoute({ controller }));
    app.register(getAllTypesRoute({ controller }));
    app.register(getTypeByIdRoute({ controller }));
    app.register(updateTypeRoute({ controller }));
    app.register(deleteTypeRoute({ controller }));
  };
}