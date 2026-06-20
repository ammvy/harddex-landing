import type { IBrandDAO } from './brand.dao.interface';
import { eq } from 'drizzle-orm';
import { brands, type BrandSelect, type BrandInsert } from '@infra/database/models/brand.schema';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class BrandDAO implements IBrandDAO {
  constructor(private readonly db: NodePgDatabase<any>) {}

  async findAll(): Promise<BrandSelect[]> {
    const rows = await this.db.select().from(brands);
    return rows as BrandSelect[];
  }

  async findById({ id }: { id: number }): Promise<BrandSelect | null> {
    const rows = await this.db.select().from(brands).where(eq(brands.id, id));
    return (rows[0] ?? null) as BrandSelect | null;
  }

  async create({ data }: { data: BrandInsert }): Promise<BrandSelect> {
    const rows = await this.db.insert(brands).values(data).returning();
    return rows[0] as BrandSelect;
  }

  async update({ id, data }: { id: number; data: Partial<BrandInsert> }): Promise<BrandSelect | null> {
    const rows = await this.db.update(brands).set(data).where(eq(brands.id, id)).returning();
    return (rows[0] ?? null) as BrandSelect | null;
  }

  async delete({ id }: { id: number }): Promise<boolean> {
    const rows = await this.db.delete(brands).where(eq(brands.id, id)).returning();
    return rows.length > 0;
  }
}
