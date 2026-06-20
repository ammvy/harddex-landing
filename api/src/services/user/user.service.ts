import { IUserDAO } from '@/dao/user/user.dao.interface';
import type { IUserService } from './user.service.interface';
import { NotFoundError } from '@/errors/not-found.error';
import { ValidationError } from '@/errors/validation.error';
import type { UserSelect } from '@infra/database/models/user.schema';
import type { CreateUserInput, UpdateUserInput } from '@/routes/user/dtos/user.schema';

export class UserService implements IUserService {
  constructor(private readonly dao: IUserDAO) {}

  async getAll(): Promise<UserSelect[]> {
    return this.dao.findAll();
  }

  async getById({ id }: { id: number }): Promise<UserSelect> {
    const user = await this.dao.findById({ id });
    if (!user) throw new NotFoundError('User', String(id));
    return user;
  }

  async getByEmail({ email }: { email: string }): Promise<UserSelect> {
    const user = await this.dao.findByEmail({ email });
    if (!user) throw new NotFoundError('User', email);
    return user;
  }

  async authenticate({ email, password }: { email: string; password: string }): Promise<UserSelect> {
    const user = await this.dao.findByEmail({ email });
    if (!user || user.password !== password) {
      throw new NotFoundError('User', email);
    }

    return user;
  }

  async requestPasswordReset({ email }: { email: string }): Promise<UserSelect> {
    const user = await this.dao.findByEmail({ email });
    if (!user) throw new NotFoundError('User', email);
    return user;
  }

  async resetPassword({ email, password }: { email: string; password: string }): Promise<UserSelect> {
    const user = await this.dao.findByEmail({ email });
    if (!user) throw new NotFoundError('User', email);

    const updatedUser = await this.dao.update({ id: user.id, data: { password } });
    if (!updatedUser) throw new NotFoundError('User', String(user.id));

    return updatedUser;
  }

  async create({ data }: { data: CreateUserInput }): Promise<UserSelect> {
    const existingUser = await this.dao.findByEmail({ email: data.email });
    if (existingUser) throw new ValidationError('Email already in use.');
    return this.dao.create({ data });
  }

  async update({ id, data }: { id: number; data: UpdateUserInput }): Promise<UserSelect> {
    if (data.email) {
      const existingUser = await this.dao.findByEmail({ email: data.email });
      if (existingUser && existingUser.id !== id) {
        throw new ValidationError('Email already in use.');
      }
    }

    const user = await this.dao.update({ id, data });
    if (!user) throw new NotFoundError('User', String(id));
    return user;
  }

  async delete({ id }: { id: number }): Promise<void> {
    const user = await this.dao.findById({ id });
    if (!user) throw new NotFoundError('User', String(id));
    await this.dao.delete({ id });
  }
}
