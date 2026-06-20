import type { FastifyInstance } from "fastify";
import type { ComponentController } from "@/controllers/component.controller";
import { createComponentRoute } from "./routes/create.route";
import { getAllComponentsRoute } from "./routes/get-all.route";
import { getComponentByIdRoute } from "./routes/get-by-id.route";
import { updateComponentRoute } from "./routes/update.route";
import { deleteComponentRoute } from "./routes/delete.route";

export function componentRoutes({ controller }: { controller: ComponentController }) {
  return async (app: FastifyInstance) => {
    app.register(createComponentRoute({ controller }));
    app.register(getAllComponentsRoute({ controller }));
    app.register(getComponentByIdRoute({ controller }));
    app.register(updateComponentRoute({ controller }));
    app.register(deleteComponentRoute({ controller }));
  };
}