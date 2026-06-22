import type { FastifyInstance } from "fastify";
import type { UserController } from "@/controllers/user.controller";
import type { ProductController } from "@/controllers/product.controller";
import type { BrandController } from "@/controllers/brand.controller";
import type { CategoryController } from "@/controllers/category.controller";
import type { ComponentController } from "@/controllers/component.controller";
import type { ManufacturerController } from "@/controllers/manufacturer.controller";
import type { ReviewController } from "@/controllers/review.controller";
import type { TypeController } from "@/controllers/type.controller";
import { userRoutes } from "./user";
import { productRoutes } from "./product";
import { brandRoutes } from "./brand";
import { categoryRoutes } from "./category";
import { componentRoutes } from "./component";
import { manufacturerRoutes } from "./manufacturer";
import { reviewRoutes } from "./review";
import { typeRoutes } from "./type";
import { AnaController } from "@/controllers/ana.controller";

export function globalRoutes({
  userController,
  productController,
  brandController,
  categoryController,
  componentController,
  manufacturerController,
  reviewController,
  typeController,
}: {
  userController: UserController;
  productController: ProductController;
  brandController: BrandController;
  categoryController: CategoryController;
  componentController: ComponentController;
  manufacturerController: ManufacturerController;
  reviewController: ReviewController;
  typeController: TypeController;
}) {
  return async (app: FastifyInstance) => {
    app.register(userRoutes({ controller: userController }), {
      prefix: "/users",
    });
    app.register(productRoutes({ controller: productController }), {
      prefix: "/products",
    });
    app.register(brandRoutes({ controller: brandController }), {
      prefix: "/brands",
    });
    app.register(categoryRoutes({ controller: categoryController }), {
      prefix: "/categories",
    });
    app.register(componentRoutes({ controller: componentController }), {
      prefix: "/components",
    });
    app.register(manufacturerRoutes({ controller: manufacturerController }), {
      prefix: "/manufacturers",
    });
    app.register(reviewRoutes({ controller: reviewController }), {
      prefix: "/reviews",
    });
    app.register(typeRoutes({ controller: typeController }), {
      prefix: "/types",
    });
  };
}
