import type { FastifyInstance } from "fastify";
import type { ManufacturerController } from "@/controllers/manufacturer.controller";
import { createManufacturerRoute } from "./routes/create.route";
import { getAllManufacturersRoute } from "./routes/get-all.route";
import { getManufacturerByIdRoute } from "./routes/get-by-id.route";
import { updateManufacturerRoute } from "./routes/update.route";
import { deleteManufacturerRoute } from "./routes/delete.route";

export function manufacturerRoutes({ controller }: { controller: ManufacturerController }) {
  return async (app: FastifyInstance) => {
    app.register(createManufacturerRoute({ controller }));
    app.register(getAllManufacturersRoute({ controller }));
    app.register(getManufacturerByIdRoute({ controller }));
    app.register(updateManufacturerRoute({ controller }));
    app.register(deleteManufacturerRoute({ controller }));
  };
}