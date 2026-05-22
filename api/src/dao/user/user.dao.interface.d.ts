import type { UserSelect } from '@infra/database/models/user.schema';

export interface IUserDAO {
  findAll(): Promise<UserSelect[]>;
  findById({ id }: { id: string }): Promise<UserSelect | null>;
  findByEmail({ email }: { email: string }): Promise<UserSelect | null>;
  create({ data }: { data: { name: string; email: string; avatarUrl?: string } }): Promise<UserSelect>;
  update({ id, data }: { id: string; data: Partial<{ name: string; email: string; avatarUrl: string }> }): Promise<UserSelect | null>;
  delete({ id }: { id: string }): Promise<boolean>;
}
