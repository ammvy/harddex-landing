const bcrypt = require('bcryptjs');
import { IUserDAO } from '@/dao/user/user.dao.interface';
import type { IUserService, AuthenticateResult } from './user.service.interface';
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

  async authenticate(
    { email, password }: { email: string; password: string },
    jwtSign: (payload: object) => string
  ): Promise<AuthenticateResult> {
    const user = await this.dao.findByEmail({ email });
    if (!user) throw new NotFoundError('User', email);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new ValidationError('Invalid credentials');

    const token = jwtSign({
      id: user.id,
      email: user.email,
      permission: user.permission,
    });

    const { password: _, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
  }

  async requestPasswordReset({ email }: { email: string }): Promise<UserSelect> {
    const user = await this.dao.findByEmail({ email });
    if (!user) throw new NotFoundError('User', email);
    return user;
  }

  async resetPassword({ email, password }: { email: string; password: string }): Promise<UserSelect> {
    const user = await this.dao.findByEmail({ email });
    if (!user) throw new NotFoundError('User', email);

    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await this.dao.update({ id: user.id, data: { password: hashedPassword } });
    if (!updatedUser) throw new NotFoundError('User', String(user.id));

    return updatedUser;
  }

  async create({ data }: { data: CreateUserInput }): Promise<UserSelect> {
    const existingUser = await this.dao.findByEmail({ email: data.email });
    if (existingUser) throw new ValidationError('Email already in use.');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.dao.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async update({ id, data }: { id: number; data: UpdateUserInput }): Promise<UserSelect> {
    if (data.email) {
      const existingUser = await this.dao.findByEmail({ email: data.email });
      if (existingUser && existingUser.id !== id) {
        throw new ValidationError('Email already in use.');
      }
    }

    const updateData = { ...data };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const user = await this.dao.update({ id, data: updateData });
    if (!user) throw new NotFoundError('User', String(id));
    return user;
  }

  async delete({ id }: { id: number }): Promise<boolean> {
    const user = await this.dao.findById({ id });
    if (!user) throw new NotFoundError('User', String(id));
    return this.dao.delete({ id });
  }
}
