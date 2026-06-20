import type { FastifyInstance } from "fastify";
import type { CategoryController } from "@/controllers/category.controller";
import { createCategoryRoute } from "./routes/create.route";
import { getAllCategoriesRoute } from "./routes/get-all.route";
import { getCategoryByIdRoute } from "./routes/get-by-id.route";
import { updateCategoryRoute } from "./routes/update.route";
import { deleteCategoryRoute } from "./routes/delete.route";

export function categoryRoutes({ controller }: { controller: CategoryController }) {
  return async (app: FastifyInstance) => {
    app.register(createCategoryRoute({ controller }));
    app.register(getAllCategoriesRoute({ controller }));
    app.register(getCategoryByIdRoute({ controller }));
    app.register(updateCategoryRoute({ controller }));
    app.register(deleteCategoryRoute({ controller }));
  };
}