import type { FastifyRequest, FastifyReply } from "fastify";
import type { IBrandService } from "@/services";

export class BrandController {
  constructor(private readonly service: IBrandService) {}

  async getAll(_req: FastifyRequest, rep: FastifyReply) {
    const brands = await this.service.getAll();
    return rep.status(200).send({ success: true, data: brands });
  }

  async getById(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as any;
    const brand = await this.service.getById({ id: Number(id) });
    return rep.status(200).send({ success: true, data: brand });
  }

  async create(req: FastifyRequest, rep: FastifyReply) {
    const data = req.body as any;  
    const newBrand = await this.service.create({ data });
    return rep.status(201).send({ success: true, data: newBrand });
  }

  async update(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as any;
    const data = req.body as any;
    const updatedBrand = await this.service.update({ id, data });
    return rep.status(200).send({ success: true, data: updatedBrand });
  }

  async delete(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as any;
    await this.service.delete({ id: Number(id) });
    return rep.status(200).send({ success: true, message: "Marca removida com sucesso" });
  }
}
