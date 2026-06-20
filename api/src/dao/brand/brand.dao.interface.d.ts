import type { BrandSelect, BrandInsert } from '@infra/database/models/brand.schema';

export interface IBrandDAO {
  findAll(): Promise<BrandSelect[]>;
  findById({ id }: { id: number }): Promise<BrandSelect | null>;
  create({ data }: { data: BrandInsert }): Promise<BrandSelect>;
  update({ id, data }: { id: number; data: Partial<BrandInsert> }): Promise<BrandSelect | null>;
  delete({ id }: { id: number }): Promise<boolean>;
}
