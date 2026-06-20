import type { ICategoryDAO } from './category.dao.interface';
import { eq } from 'drizzle-orm';
import { categories, type CategorySelect, type CategoryInsert } from '@infra/database/models/category.schema';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class CategoryDAO implements ICategoryDAO {
  constructor(private readonly db: NodePgDatabase<any>) {}

  async findAll(): Promise<CategorySelect[]> {
    const rows = await this.db.select().from(categories);
    return rows as CategorySelect[];
  }

  async findById({ id }: { id: number }): Promise<CategorySelect | null> {
    const rows = await this.db.select().from(categories).where(eq(categories.id, id));
    return (rows[0] ?? null) as CategorySelect | null;
  }

  async create({ data }: { data: CategoryInsert }): Promise<CategorySelect> {
    const rows = await this.db.insert(categories).values(data).returning();
    return rows[0] as CategorySelect;
  }

  async update({ id, data }: { id: number; data: Partial<CategoryInsert> }): Promise<CategorySelect | null> {
    const rows = await this.db.update(categories).set(data).where(eq(categories.id, id)).returning();
    return (rows[0] ?? null) as CategorySelect | null;
  }

  async delete({ id }: { id: number }): Promise<boolean> {
    const rows = await this.db.delete(categories).where(eq(categories.id, id)).returning();
    return rows.length > 0;
  }
}
