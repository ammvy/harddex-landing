import type { FastifyRequest, FastifyReply } from "fastify";
import type { IUserService } from "@/services/user/user.service.interface";

export class UserController {
  constructor(private readonly service: IUserService) {}

  async getAll(_req: FastifyRequest, rep: FastifyReply) {
    const users = await this.service.getAll();
    return rep.status(200).send({ success: true, data: users });
  }

  async getById(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as any;
    const user = await this.service.getById({ id });
    return rep.status(200).send({ success: true, data: user });
  }

  async create(req: FastifyRequest, rep: FastifyReply) {
    const data = req.body as any;
    const user = await this.service.create({ data });
    return rep.status(201).send({ success: true, data: user });
  }

  async authenticate(req: FastifyRequest, rep: FastifyReply) {
    const data = req.body as any;
    const user = await this.service.authenticate(data);
    return rep.status(200).send({ success: true, data: user });
  }

  async requestPasswordReset(req: FastifyRequest, rep: FastifyReply) {
    const data = req.body as any;
    const user = await this.service.requestPasswordReset(data);
    return rep.status(200).send({ success: true, data: user });
  }

  async resetPassword(req: FastifyRequest, rep: FastifyReply) {
    const data = req.body as any;
    const user = await this.service.resetPassword(data);
    return rep.status(200).send({ success: true, data: user });
  }

  async update(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as any;
    const data = req.body as any;
    const user = await this.service.update({ id, data });
    return rep.status(200).send({ success: true, data: user });
  }

  async delete(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as any;
    await this.service.delete({ id });
    return rep.status(204).send();
  }
}
