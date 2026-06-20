import type { CategoryInsert, CategorySelect } from '@infra/database/models/category.schema';

export interface ICategoryService {
  getAll(): Promise<CategorySelect[]>;
  getById({ id }: { id: number }): Promise<CategorySelect>;
  create({ data }: { data: CategoryInsert }): Promise<CategorySelect>;
  update({ id, data }: { id: number; data: Partial<CategoryInsert> }): Promise<CategorySelect>;
  delete({ id }: { id: number }): Promise<boolean>;
}
