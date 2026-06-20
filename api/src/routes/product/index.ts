import type { FastifyInstance } from "fastify";
import type { ProductController } from "@/controllers/product.controller";
import { createProductRoute } from "./routes/create.route";
import { getAllProductsRoute } from "./routes/get-all.route";
import { getProductByIdRoute } from "./routes/get-by-id.route";
import { updateProductRoute } from "./routes/update.route";
import { deleteProductRoute } from "./routes/delete.route";

export function productRoutes({ controller }: { controller: ProductController }) {
  return async (app: FastifyInstance) => {
    app.register(createProductRoute({ controller }));
    app.register(getAllProductsRoute({ controller }));
    app.register(getProductByIdRoute({ controller }));
    app.register(updateProductRoute({ controller }));
    app.register(deleteProductRoute({ controller }));
  };
}