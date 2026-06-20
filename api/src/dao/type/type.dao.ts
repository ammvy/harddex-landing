import type { ITypeDAO } from './type.dao.interface';
import { eq } from 'drizzle-orm';
import { types, type TypeSelect, type TypeInsert } from '@infra/database/models/type.schema';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class TypeDAO implements ITypeDAO {
  constructor(private readonly db: NodePgDatabase<any>) {}

  async findAll(): Promise<TypeSelect[]> {
    const rows = await this.db.select().from(types);
    return rows as TypeSelect[];
  }

  async findById({ id }: { id: number }): Promise<TypeSelect | null> {
    const rows = await this.db.select().from(types).where(eq(types.id, id));
    return (rows[0] ?? null) as TypeSelect | null;
  }

  async create({ data }: { data: TypeInsert }): Promise<TypeSelect> {
    const rows = await this.db.insert(types).values(data).returning();
    return rows[0] as TypeSelect;
  }

  async update({ id, data }: { id: number; data: Partial<TypeInsert> }): Promise<TypeSelect | null> {
    const rows = await this.db.update(types).set(data).where(eq(types.id, id)).returning();
    return (rows[0] ?? null) as TypeSelect | null;
  }

  async delete({ id }: { id: number }): Promise<boolean> {
    const rows = await this.db.delete(types).where(eq(types.id, id)).returning();
    return rows.length > 0;
  }
}
