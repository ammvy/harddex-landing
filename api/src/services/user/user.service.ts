import { IUserDAO } from '@/dao/user/user.dao.interface';
import type { IUserService } from './user.service.interface';
import type { FirebaseStorage } from '@infra/firebase/storage';
import { NotFoundError } from '@/errors/not-found.error';
import { ValidationError } from '@/errors/validation.error';
import type { CreateUserInput, UpdateUserInput } from '@/routes/user/dtos/user.schema';

export class UserService implements IUserService {
  constructor(
    private readonly dao: IUserDAO,
    private readonly storage?: FirebaseStorage,
  ) {}

  async getAll() {
    return this.dao.findAll();
  }

  async getById({ id }: { id: number }) {
    const user = await this.dao.findById({ id });
    if (!user) throw new NotFoundError('User', String(id));
    return user;
  }

  async getByEmail({ email }: { email: string }) {
    const user = await this.dao.findByEmail({ email });
    if (!user) throw new NotFoundError('User', email);
    return user;
  }

  async create({ data }: { data: CreateUserInput }) {
    const existingUser = await this.dao.findByEmail({ email: data.email });
    if (existingUser) throw new ValidationError('Email already in use.');
    return this.dao.create({ data });
  }

  async update({ id, data }: { id: number; data: UpdateUserInput }) {
    const user = await this.dao.update({ id, data });
    if (!user) throw new NotFoundError('User', String(id));
    return user;
  }

  async delete({ id }: { id: number }) {
    const user = await this.dao.findById({ id });
    if (!user) throw new NotFoundError('User', String(id));
    await this.dao.delete({ id });
  }
}
