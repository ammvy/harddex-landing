import type { CategorySelect, CategoryInsert } from '@infra/database/models/category.schema';

export interface ICategoryDAO {
  findAll(): Promise<CategorySelect[]>;
  findById({ id }: { id: number }): Promise<CategorySelect | null>;
  create({ data }: { data: CategoryInsert }): Promise<CategorySelect>;
  update({ id, data }: { id: number; data: Partial<CategoryInsert> }): Promise<CategorySelect | null>;
  delete({ id }: { id: number }): Promise<boolean>;
}
