import type { FastifyRequest, FastifyReply } from "fastify";
import type { IReviewService } from "@/services";

export class ReviewController {
  constructor(private readonly service: IReviewService) {}

  async getAll(_req: FastifyRequest, rep: FastifyReply) {
    const reviews = await this.service.getAll();
    return rep.status(200).send({ success: true, data: reviews });
  }

  async getById(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as any;
    const Review = await this.service.getById({ id: Number(id) });
    return rep.status(200).send({ success: true, data: Review });
  }

  async create(req: FastifyRequest, rep: FastifyReply) {
    const data = req.body as any;
    const newReview = await this.service.create({ data });
    return rep.status(201).send({ success: true, data: newReview });
  }

  async update(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as any;
    const data = req.body as any;
    const updatedReview = await this.service.update({ id: Number(id), data });
    return rep.status(200).send({ success: true, data: updatedReview });
  }

  async delete(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as any;
    await this.service.delete({ id: Number(id) });
    return rep.status(204).send();
  }
}
