import type { IManufacturerDAO } from './manufacturer.dao.interface';
import { eq } from 'drizzle-orm';
import { manufacturers, type ManufacturerSelect, type ManufacturerInsert } from '@infra/database/models/manufacturer.schema';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class ManufacturerDAO implements IManufacturerDAO {
  constructor(private readonly db: NodePgDatabase<any>) {}

  async findAll(): Promise<ManufacturerSelect[]> {
    const rows = await this.db.select().from(manufacturers);
    return rows as ManufacturerSelect[];
  }

  async findById({ id }: { id: number }): Promise<ManufacturerSelect | null> {
    const rows = await this.db.select().from(manufacturers).where(eq(manufacturers.id, id));
    return (rows[0] ?? null) as ManufacturerSelect | null;
  }

  async create({ data }: { data: ManufacturerInsert }): Promise<ManufacturerSelect> {
    const rows = await this.db.insert(manufacturers).values(data).returning();
    return rows[0] as ManufacturerSelect;
  }

  async update({ id, data }: { id: number; data: Partial<ManufacturerInsert> }): Promise<ManufacturerSelect | null> {
    const rows = await this.db.update(manufacturers).set(data).where(eq(manufacturers.id, id)).returning();
    return (rows[0] ?? null) as ManufacturerSelect | null;
  }

  async delete({ id }: { id: number }): Promise<boolean> {
    const rows = await this.db.delete(manufacturers).where(eq(manufacturers.id, id)).returning();
    return rows.length > 0;
  }
}
