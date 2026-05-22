import type { FastifyRequest, FastifyReply } from 'fastify';
import type { IUserService } from '@/services/user/user.service.interface';
import { createUserDTO, updateUserDTO, paramIdDTO } from '@/routes/user/dtos/user.schema';

export class UserController {
  constructor(private readonly service: IUserService) {}

  async getAll(_req: FastifyRequest, reply: FastifyReply) {
    const users = await this.service.getAll();
    reply.send({ success: true, data: users });
  }

  async getById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = paramIdDTO.parse(req.params);
    const user = await this.service.getById({ id });
    reply.send({ success: true, data: user });
  }

  async create(req: FastifyRequest, reply: FastifyReply) {
    const data = createUserDTO.parse(req.body);
    const user = await this.service.create({ data });
    reply.status(201).send({ success: true, data: user });
  }

  async update(req: FastifyRequest, reply: FastifyReply) {
    const { id } = paramIdDTO.parse(req.params);
    const data = updateUserDTO.parse(req.body);
    const user = await this.service.update({ id, data });
    reply.send({ success: true, data: user });
  }

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const { id } = paramIdDTO.parse(req.params);
    await this.service.delete({ id });
    reply.status(204).send();
  }

  async uploadAvatar(req: FastifyRequest, reply: FastifyReply) {
    const { id } = paramIdDTO.parse(req.params);
    const file = await req.file();
    if (!file) {
      reply.status(400).send({ success: false, error: { message: 'No file uploaded' } });
      return;
    }
    const buffer = await file.toBuffer();
    const user = await this.service.uploadAvatar({ userId: id, buffer, mimetype: file.mimetype });
    reply.send({ success: true, data: user });
  }
}
