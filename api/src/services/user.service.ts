import type { IUserRepository } from '@/repositories/user.repository';
import type { FirebaseStorage } from '@infra/firebase/storage';
import type { UserSelect } from '@infra/database/schema/user.schema';
import { NotFoundError } from '@/errors/not-found.error';
import { ValidationError } from '@/errors/validation.error';
import type { CreateUserInput, UpdateUserInput } from '@/dtos/user.dto';

// ── Interface ──
export interface IUserService {
  getAll(): Promise<UserSelect[]>;
  getById(id: string): Promise<UserSelect>;
  getByEmail(email: string): Promise<UserSelect>;
  create(data: CreateUserInput): Promise<UserSelect>;
  update(id: string, data: UpdateUserInput): Promise<UserSelect>;
  delete(id: string): Promise<void>;
  uploadAvatar(userId: string, buffer: Buffer, mimetype: string): Promise<UserSelect>;
}

// ── Implementação ──
export class UserService implements IUserService {
  constructor(
    private readonly repository: IUserRepository,
    private readonly storage: FirebaseStorage,
  ) {}

  async getAll() {
    return this.repository.findAll();
  }

  async getById(id: string) {
    const user = await this.repository.findById(id);
    if (!user) throw new NotFoundError('User', id);
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.repository.findByEmail(email);
    if (!user) throw new NotFoundError('User', email);
    return user;
  }

  async create(data: CreateUserInput) {
    const exists = await this.repository.existsByEmail(data.email);
    if (exists) throw new ValidationError('Email already in use.');
    return this.repository.create(data);
  }

  async update(id: string, data: UpdateUserInput) {
    const user = await this.repository.update(id, data);
    if (!user) throw new NotFoundError('User', id);
    return user;
  }

  async delete(id: string) {
    const user = await this.repository.findById(id);
    if (!user) throw new NotFoundError('User', id);

    // Deleta avatar do Storage se existir
    if (user.avatarUrl) {
      await this.storage.delete(`avatars/${id}`);
    }
    await this.repository.delete(id);
  }

  async uploadAvatar(userId: string, buffer: Buffer, mimetype: string) {
    const user = await this.repository.findById(userId);
    if (!user) throw new NotFoundError('User', userId);

    const path = `avatars/${userId}`;
    const publicUrl = await this.storage.upload(buffer, path, mimetype);
    const updated = await this.repository.update(userId, { avatarUrl: publicUrl });
    return updated!;
  }
}
