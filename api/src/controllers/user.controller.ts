import type { IUserService } from "@/services/user/user.service.interface";
import type { HttpRequest, HttpResponse } from "@/interfaces/http";
import {
  createUserDTO,
  updateUserDTO,
  paramIdDTO,
} from "@/routes/user/dtos/user.schema";

export class UserController {
  constructor(private readonly service: IUserService) {}

  async getAll(_req: HttpRequest): Promise<HttpResponse> {
    const users = await this.service.getAll();
    return { statusCode: 200, body: { success: true, data: users } };
  }

  async getById(req: HttpRequest): Promise<HttpResponse> {
    const { id } = paramIdDTO.parse(req.params);
    const user = await this.service.getById({ id });
    return { statusCode: 200, body: { success: true, data: user } };
  }

  async create(req: HttpRequest): Promise<HttpResponse> {
    const data = createUserDTO.parse(req.body);
    const user = await this.service.create({ data });
    return { statusCode: 201, body: { success: true, data: user } };
  }

  async update(req: HttpRequest): Promise<HttpResponse> {
    const { id } = paramIdDTO.parse(req.params);
    const data = updateUserDTO.parse(req.body);
    const user = await this.service.update({ id, data });
    return { statusCode: 200, body: { success: true, data: user } };
  }

  async delete(req: HttpRequest): Promise<HttpResponse> {
    const { id } = paramIdDTO.parse(req.params);
    await this.service.delete({ id });
    return { statusCode: 204 };
  }
}
