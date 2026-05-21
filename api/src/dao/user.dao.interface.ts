import type { UserSelect } from '@infra/database/schema/user.schema';

export interface IUserDAO {
  findAll(): Promise<UserSelect[]>;
  findById(id: string): Promise<UserSelect | null>;
  findByEmail(email: string): Promise<UserSelect | null>;
  create(data: { name: string; email: string; avatarUrl?: string }): Promise<UserSelect>;
  update(id: string, data: Partial<{ name: string; email: string; avatarUrl: string }>): Promise<UserSelect | null>;
  delete(id: string): Promise<boolean>;
}
