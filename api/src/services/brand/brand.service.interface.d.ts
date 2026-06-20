import type { BrandSelect } from '@infra/database/models/brand.schema';

export type BrandCreateInput = {
  name: string;
};

export type BrandUpdateInput = Partial<BrandCreateInput>;

export interface IBrandService {
  getAll(): Promise<BrandSelect[]>;
  getById({ id }: { id: number }): Promise<BrandSelect>;
  create({ data }: { data: BrandCreateInput }): Promise<BrandSelect>;
  update({ id, data }: { id: number; data: BrandUpdateInput }): Promise<BrandSelect>;
  delete({ id }: { id: number }): Promise<boolean>;
}
