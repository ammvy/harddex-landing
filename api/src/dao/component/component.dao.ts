import type { IComponentDAO } from './component.dao.interface';
import { eq } from 'drizzle-orm';
import { components, type ComponentSelect, type ComponentInsert } from '@infra/database/models/component.schema';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class ComponentDAO implements IComponentDAO {
  constructor(private readonly db: NodePgDatabase<any>) {}

  async findAll(): Promise<ComponentSelect[]> {
    const rows = await this.db.select().from(components);
    return rows as ComponentSelect[];
  }

  async findById({ id }: { id: number }): Promise<ComponentSelect | null> {
    const rows = await this.db.select().from(components).where(eq(components.id, id));
    return (rows[0] ?? null) as ComponentSelect | null;
  }

  async create({ data }: { data: ComponentInsert }): Promise<ComponentSelect> {
    const rows = await this.db.insert(components).values(data).returning();
    return rows[0] as ComponentSelect;
  }

  async update({ id, data }: { id: number; data: Partial<ComponentInsert> }): Promise<ComponentSelect | null> {
    const rows = await this.db.update(components).set(data).where(eq(components.id, id)).returning();
    return (rows[0] ?? null) as ComponentSelect | null;
  }

  async delete({ id }: { id: number }): Promise<boolean> {
    const rows = await this.db.delete(components).where(eq(components.id, id)).returning();
    return rows.length > 0;
  }
}
