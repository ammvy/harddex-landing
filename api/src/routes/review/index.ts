import type { FastifyInstance } from "fastify";
import type { ReviewController } from "@/controllers/review.controller";
import { createReviewRoute } from "./routes/create.route";
import { getAllReviewsRoute } from "./routes/get-all.route";
import { getReviewByIdRoute } from "./routes/get-by-id.route";
import { updateReviewRoute } from "./routes/update.route";
import { deleteReviewRoute } from "./routes/delete.route";

export function reviewRoutes({ controller }: { controller: ReviewController }) {
  return async (app: FastifyInstance) => {
    app.register(createReviewRoute({ controller }));
    app.register(getAllReviewsRoute({ controller }));
    app.register(getReviewByIdRoute({ controller }));
    app.register(updateReviewRoute({ controller }));
    app.register(deleteReviewRoute({ controller }));
  };
}