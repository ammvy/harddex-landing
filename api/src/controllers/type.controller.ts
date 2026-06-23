import type { FastifyRequest, FastifyReply } from "fastify";
import type { ITypeService } from "@/services";

export class TypeController {
  constructor(private readonly service: ITypeService) {}

  async getAll(_req: FastifyRequest, rep: FastifyReply) {
    const types = await this.service.getAll();
    return rep.status(200).send({ success: true, data: types });
  }

  async getById(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as any;
    const Type = await this.service.getById({ id: Number(id) });
    return rep.status(200).send({ success: true, data: Type });
  }

  async create(req: FastifyRequest, rep: FastifyReply) {
    const data = req.body as any;
    const newType = await this.service.create({ data });
    return rep.status(201).send({ success: true, data: newType });
  }

  async update(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as any;
    const data = req.body as any;
    const updatedType = await this.service.update({ id: Number(id), data });
    return rep.status(200).send({ success: true, data: updatedType });
  }

  async delete(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as any;
    await this.service.delete({ id: Number(id) });
    return rep.status(200).send({ success: true, message: "Tipo removido com sucesso" });
  }
}
