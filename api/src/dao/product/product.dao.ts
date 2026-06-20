import type { IProductDAO } from './product.dao.interface';
import { eq } from 'drizzle-orm';
import { products, type ProductSelect, type ProductInsert } from '@infra/database/models/product.schema';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class ProductDAO implements IProductDAO {
  constructor(private readonly db: NodePgDatabase<any>) {}

  async findAll(): Promise<ProductSelect[]> {
    const rows = await this.db.select().from(products);
    return rows as ProductSelect[];
  }

  async findById({ id }: { id: number }): Promise<ProductSelect | null> {
    const rows = await this.db.select().from(products).where(eq(products.id, id));
    return (rows[0] ?? null) as ProductSelect | null;
  }

  async create({ data }: { data: ProductInsert }): Promise<ProductSelect> {
    const rows = await this.db.insert(products).values(data).returning();
    return rows[0] as ProductSelect;
  }

  async update({ id, data }: { id: number; data: Partial<ProductInsert> }): Promise<ProductSelect | null> {
    const rows = await this.db.update(products).set(data).where(eq(products.id, id)).returning();
    return (rows[0] ?? null) as ProductSelect | null;
  }

  async delete({ id }: { id: number }): Promise<boolean> {
    const rows = await this.db.delete(products).where(eq(products.id, id)).returning();
    return rows.length > 0;
  }
}
