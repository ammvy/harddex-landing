import type { IUserDAO } from './user.dao.interface';
import { eq } from 'drizzle-orm';
import { users, type UserSelect, type UserInsert } from '@infra/database/models/user.schema';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class UserDAO implements IUserDAO {
  constructor(private readonly db: NodePgDatabase<any>) {}

  async findAll(): Promise<UserSelect[]> {
    const rows = await this.db.select().from(users);
    return rows as UserSelect[];
  }

  async findById({ id }: { id: number }): Promise<UserSelect | null> {
    const rows = await this.db.select().from(users).where(eq(users.id, id));
    return (rows[0] ?? null) as UserSelect | null;
  }

  async findByEmail({ email }: { email: string }): Promise<UserSelect | null> {
    const rows = await this.db.select().from(users).where(eq(users.email, email));
    return (rows[0] ?? null) as UserSelect | null;
  }

  async create({ data }: { data: UserInsert }): Promise<UserSelect> {
    const rows = await this.db.insert(users).values(data).returning();
    return rows[0] as UserSelect;
  }

  async update({ id, data }: { id: number; data: Partial<UserInsert> }): Promise<UserSelect | null> {
    const rows = await this.db.update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return (rows[0] ?? null) as UserSelect | null;
  }

  async delete({ id }: { id: number }): Promise<boolean> {
    const rows = await this.db.delete(users).where(eq(users.id, id)).returning();
    return rows.length > 0;
  }
}
