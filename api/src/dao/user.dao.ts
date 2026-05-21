import { eq } from 'drizzle-orm';
import { users, type UserSelect } from '@infra/database/schema/user.schema';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

// ── Interface (port) ──
export interface IUserDAO {
  findAll(): Promise<UserSelect[]>;
  findById(id: string): Promise<UserSelect | null>;
  findByEmail(email: string): Promise<UserSelect | null>;
  create(data: { name: string; email: string; avatarUrl?: string }): Promise<UserSelect>;
  update(id: string, data: Partial<{ name: string; email: string; avatarUrl: string }>): Promise<UserSelect | null>;
  delete(id: string): Promise<boolean>;
}

// ── Implementação ──
export class UserDAO implements IUserDAO {
  constructor(private readonly db: NodePgDatabase<any>) {}

  async findAll() {
    return this.db.select().from(users);
  }

  async findById(id: string) {
    const rows = await this.db.select().from(users).where(eq(users.id, id));
    return rows[0] ?? null;
  }

  async findByEmail(email: string) {
    const rows = await this.db.select().from(users).where(eq(users.email, email));
    return rows[0] ?? null;
  }

  async create(data: { name: string; email: string; avatarUrl?: string }) {
    const rows = await this.db.insert(users).values(data).returning();
    return rows[0];
  }

  async update(id: string, data: Partial<{ name: string; email: string; avatarUrl: string }>) {
    const rows = await this.db.update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return rows[0] ?? null;
  }

  async delete(id: string) {
    const rows = await this.db.delete(users).where(eq(users.id, id)).returning();
    return rows.length > 0;
  }
}
