import type { IUserDAO } from './user.dao.interface';
import { eq } from 'drizzle-orm';
import { users, type UserSelect } from '@/infra/database/models/user.schema';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class UserDAO implements IUserDAO {
  constructor(private readonly db: NodePgDatabase<any>) {}

  async findAll(): Promise<UserSelect[]> {
    const rows = await this.db.select().from(users);
    return rows as UserSelect[];
  }

  async findById(id: string): Promise<UserSelect | null> {
    const rows = await this.db.select().from(users).where(eq(users.id, id));
    return (rows[0] ?? null) as UserSelect | null;
  }

  async findByEmail(email: string): Promise<UserSelect | null> {
    const rows = await this.db.select().from(users).where(eq(users.email, email));
    return (rows[0] ?? null) as UserSelect | null;
  }

  async create(data: { name: string; email: string; avatarUrl?: string }): Promise<UserSelect> {
    const rows = await this.db.insert(users).values(data).returning();
    return rows[0] as UserSelect;
  }

  async update(id: string, data: Partial<{ name: string; email: string; avatarUrl: string }>): Promise<UserSelect | null> {
    const rows = await this.db.update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return (rows[0] ?? null) as UserSelect | null;
  }

  async delete(id: string): Promise<boolean> {
    const rows = await this.db.delete(users).where(eq(users.id, id)).returning();
    return rows.length > 0;
  }
}
