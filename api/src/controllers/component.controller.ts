import type { FastifyRequest, FastifyReply } from "fastify";
import type { IComponentService } from "@/services";

export class ComponentController {
  constructor(private readonly service: IComponentService) {}

  async getAll(_req: FastifyRequest, rep: FastifyReply) {
    const components = await this.service.getAll();
    return rep.status(200).send({ success: true, data: components });
  }

  async getById(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as any;
    const Component = await this.service.getById({ id: Number(id) });
    return rep.status(200).send({ success: true, data: Component });
  }

  async create(req: FastifyRequest, rep: FastifyReply) {
    const data = req.body as any;
    const newComponent = await this.service.create({ data });
    return rep.status(201).send({ success: true, data: newComponent });
  }

  async update(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as any;
    const data = req.body as any;
    const updatedComponent = await this.service.update({ id: Number(id), data });
    return rep.status(200).send({ success: true, data: updatedComponent });
  }

  async delete(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as any;
    await this.service.delete({ id: Number(id) });
    return rep.status(204).send();
  }
}
