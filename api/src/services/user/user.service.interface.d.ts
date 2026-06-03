import type { UserSelect } from '@infra/database/models/user.schema';
import type { CreateUserInput, UpdateUserInput } from '@/routes/user/dtos/user.schema';

export interface IUserService {
  getAll(): Promise<UserSelect[]>;
  getById({ id }: { id: number }): Promise<UserSelect>;
  getByEmail({ email }: { email: string }): Promise<UserSelect>;
  create({ data }: { data: CreateUserInput }): Promise<UserSelect>;
  update({ id, data }: { id: number; data: UpdateUserInput }): Promise<UserSelect>;
  delete({ id }: { id: number }): Promise<void>;
}
