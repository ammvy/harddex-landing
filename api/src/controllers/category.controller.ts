import type { FastifyRequest, FastifyReply } from "fastify";
import type { ICategoryService } from "@/services";

export class CategoryController {
  constructor(private readonly service: ICategoryService) {}

  async getAll(_req: FastifyRequest, rep: FastifyReply) {
    const categories = await this.service.getAll();
    return rep.status(200).send({ success: true, data: categories });
  }

  async getById(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as any;
    const category = await this.service.getById(id);
    return rep.status(200).send({ success: true, data: category });
  }

  async create(req: FastifyRequest, rep: FastifyReply) {
    const data = req.body as any;
    const newCategory = await this.service.create(data);
    return rep.status(201).send({ success: true, data: newCategory });
  }

  async update(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as any;
    const data = req.body as any;
    const updatedCategory = await this.service.update({ id, data });
    return rep.status(200).send({ success: true, data: updatedCategory });
  }

  async delete(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as any;
    await this.service.delete(id);
    return rep.status(204).send();
  }
}
