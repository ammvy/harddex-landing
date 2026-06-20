import type { CategorySelect } from '@infra/database/models/category.schema';

export interface ICategoryService {
  getAll(): Promise<CategorySelect[]>;
  getById({ id }: { id: number }): Promise<CategorySelect>;
  create({ data }: { data: any }): Promise<CategorySelect>;
  update({ id, data }: { id: number; data: any }): Promise<CategorySelect>;
  delete({ id }: { id: number }): Promise<void>;
}
