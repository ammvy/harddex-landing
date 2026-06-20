import type { FastifyInstance } from "fastify";
import type { BrandController } from "@/controllers/brand.controller";
import { createBrandRoute } from "./routes/create.route";
import { getAllBrandsRoute } from "./routes/get-all.route";
import { getBrandByIdRoute } from "./routes/get-by-id.route";
import { updateBrandRoute } from "./routes/update.route";
import { deleteBrandRoute } from "./routes/delete.route";

export function brandRoutes({ controller }: { controller: BrandController }) {
  return async (app: FastifyInstance) => {
    app.register(createBrandRoute({ controller }));
    app.register(getAllBrandsRoute({ controller }));
    app.register(getBrandByIdRoute({ controller }));
    app.register(updateBrandRoute({ controller }));
    app.register(deleteBrandRoute({ controller }));
  };
}