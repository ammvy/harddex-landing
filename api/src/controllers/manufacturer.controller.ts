import type { FastifyRequest, FastifyReply } from "fastify";
import type { IManufacturerService } from "@/services";

export class ManufacturerController {
  constructor(private readonly service: IManufacturerService) {}

  async getAll(_req: FastifyRequest, rep: FastifyReply) {
    const manufacturers = await this.service.getAll();
    return rep.status(200).send({ success: true, data: manufacturers });
  }

  async getById(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as any;
    const Manufacturer = await this.service.getById({ id: Number(id) });
    return rep.status(200).send({ success: true, data: Manufacturer });
  }

  async create(req: FastifyRequest, rep: FastifyReply) {
    const data = req.body as any;
    const newManufacturer = await this.service.create({ data });
    return rep.status(201).send({ success: true, data: newManufacturer });
  }

  async update(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as any;
    const data = req.body as any;
    const updatedManufacturer = await this.service.update({ id: Number(id), data });
    return rep.status(200).send({ success: true, data: updatedManufacturer });
  }

  async delete(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as any;
    await this.service.delete({ id: Number(id) });
    return rep.status(204).send();
  }
}
