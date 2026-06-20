import type { ProductInsert, ProductSelect } from '@infra/database/models/product.schema';

export interface IProductService {
  getAll(): Promise<ProductSelect[]>;
  getById({ id }: { id: number }): Promise<ProductSelect>;
  create({ data }: { data: ProductInsert }): Promise<ProductSelect>;
  update({ id, data }: { id: number; data: Partial<ProductInsert> }): Promise<ProductSelect>;
  delete({ id }: { id: number }): Promise<boolean>;
}
