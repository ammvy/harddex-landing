import type { ProductSelect, ProductInsert } from '@infra/database/models/product.schema';

export interface IProductDAO {
  findAll(): Promise<ProductSelect[]>;
  findById({ id }: { id: number }): Promise<ProductSelect | null>;
  create({ data }: { data: ProductInsert }): Promise<ProductSelect>;
  update({ id, data }: { id: number; data: Partial<ProductInsert> }): Promise<ProductSelect | null>;
  delete({ id }: { id: number }): Promise<boolean>;
}
