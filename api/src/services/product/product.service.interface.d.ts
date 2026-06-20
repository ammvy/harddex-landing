import type { ProductSelect } from '@infra/database/models/product.schema';

export interface IProductService {
  getAll(): Promise<ProductSelect[]>;
  getById({ id }: { id: number }): Promise<ProductSelect>;
  create({ data }: { data: any }): Promise<ProductSelect>;
  update({ id, data }: { id: number; data: any }): Promise<ProductSelect>;
  delete({ id }: { id: number }): Promise<void>;
}
