import type { UserSelect, UserInsert } from '@infra/database/models/user.schema';

export interface IUserDAO {
  findAll(): Promise<UserSelect[]>;
  findById({ id }: { id: number }): Promise<UserSelect | null>;
  findByEmail({ email }: { email: string }): Promise<UserSelect | null>;
  create({ data }: { data: UserInsert }): Promise<UserSelect>;
  update({ id, data }: { id: number; data: Partial<UserInsert> }): Promise<UserSelect | null>;
  delete({ id }: { id: number }): Promise<boolean>;
}
