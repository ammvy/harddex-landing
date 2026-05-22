import type { UserSelect } from '@/infra/database/models/user.schema';
import type { CreateUserInput, UpdateUserInput } from '@/routes/user/dtos/user.schema';

export interface IUserService {
  getAll(): Promise<UserSelect[]>;
  getById(id: string): Promise<UserSelect>;
  getByEmail(email: string): Promise<UserSelect>;
  create(data: CreateUserInput): Promise<UserSelect>;
  update(id: string, data: UpdateUserInput): Promise<UserSelect>;
  delete(id: string): Promise<void>;
  uploadAvatar(userId: string, buffer: Buffer, mimetype: string): Promise<UserSelect>;
}
