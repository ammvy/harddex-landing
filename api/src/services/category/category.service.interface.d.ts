import type { CategorySelect } from '@infra/database/models/category.schema';

export type CategoryCreateInput = {
  name: string;
  color?: string | null;
};

export type CategoryUpdateInput = Partial<CategoryCreateInput>;

export interface ICategoryService {
  getAll(): Promise<CategorySelect[]>;
  getById({ id }: { id: number }): Promise<CategorySelect>;
  create({ data }: { data: CategoryCreateInput }): Promise<CategorySelect>;
  update({ id, data }: { id: number; data: CategoryUpdateInput }): Promise<CategorySelect>;
  delete({ id }: { id: number }): Promise<boolean>;
}
