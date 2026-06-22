import type { FastifyRequest, FastifyReply } from "fastify";
import type { IProductService } from "@/services";
export class ProductController {
  constructor(private readonly service: IProductService) {}
  async getAll(req: FastifyRequest, rep: FastifyReply) {
    const { detailed } = req.query as any;
    const products = await this.service.getAll();
    return rep.status(200).send({ success: true, detailedParam: detailed, data: products as any });
  }
  async getById(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as any;
    const product = await this.service.getById({ id: Number(id) });
    return rep.status(200).send({ success: true, data: product });
  }
  async create(req: FastifyRequest, rep: FastifyReply) {
    const data = req.body as any;
    const newProduct = await this.service.create({ data });
    return rep.status(201).send({ success: true, data: newProduct });
  }
  async update(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as any;
    const data = req.body as any;
    const updatedProduct = await this.service.update({ id: Number(id), data });
    return rep.status(200).send({ success: true, data: updatedProduct });
  }
  async delete(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as any;
    await this.service.delete({ id: Number(id) });
    return rep.status(200).send({ success: true, message: "Produto removido com sucesso" });
  }
}