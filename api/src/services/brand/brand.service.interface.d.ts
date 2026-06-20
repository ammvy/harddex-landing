import type { BrandInsert, BrandSelect } from '@infra/database/models/brand.schema';

export interface IBrandService {
  getAll(): Promise<BrandSelect[]>;
  getById({ id }: { id: number }): Promise<BrandSelect>;
  create({ data }: { data: BrandInsert }): Promise<BrandSelect>;
  update({ id, data }: { id: number; data: Partial<BrandInsert> }): Promise<BrandSelect>;
  delete({ id }: { id: number }): Promise<boolean>;
}
