import type { BrandSelect } from '@infra/database/models/brand.schema';

export interface IBrandService {
  getAll(): Promise<BrandSelect[]>;
  getById({ id }: { id: number }): Promise<BrandSelect>;
  create({ data }: { data: any }): Promise<BrandSelect>;
  update({ id, data }: { id: number; data: any }): Promise<BrandSelect>;
  delete({ id }: { id: number }): Promise<void>;
}
