import { IUserDAO } from '@/dao/user/user.dao.interface';
import type { IUserService } from './user.service.interface';
import type { FirebaseStorage } from '@infra/firebase/storage';
import { NotFoundError } from '@/errors/not-found.error';
import { ValidationError } from '@/errors/validation.error';
import type { CreateUserInput, UpdateUserInput } from '@/routes/user/dtos/user.schema';

export class UserService implements IUserService {
  constructor(
    private readonly dao: IUserDAO,
    private readonly storage: FirebaseStorage,
  ) {}

  async getAll() {
    return this.dao.findAll();
  }

  async getById(id: string) {
    const user = await this.dao.findById(id);
    if (!user) throw new NotFoundError('User', id);
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.dao.findByEmail(email);
    if (!user) throw new NotFoundError('User', email);
    return user;
  }

  async create(data: CreateUserInput) {
    const existingUser = await this.dao.findByEmail(data.email);
    if (existingUser) throw new ValidationError('Email already in use.');
    return this.dao.create(data);
  }

  async update(id: string, data: UpdateUserInput) {
    const user = await this.dao.update(id, data);
    if (!user) throw new NotFoundError('User', id);
    return user;
  }

  async delete(id: string) {
    const user = await this.dao.findById(id);
    if (!user) throw new NotFoundError('User', id);

    // Deleta avatar do Storage se existir
    if (user.avatarUrl) {
      await this.storage.delete(`avatars/${id}`);
    }
    await this.dao.delete(id);
  }

  async uploadAvatar(userId: string, buffer: Buffer, mimetype: string) {
    const user = await this.dao.findById(userId);
    if (!user) throw new NotFoundError('User', userId);

    const path = `avatars/${userId}`;
    const publicUrl = await this.storage.upload(buffer, path, mimetype);
    const updated = await this.dao.update(userId, { avatarUrl: publicUrl });
    return updated!;
  }
}
