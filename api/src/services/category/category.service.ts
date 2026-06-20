import { ICategoryDAO } from '@/dao/category/category.dao.interface';
import type { ICategoryService } from './category.service.interface';
import { NotFoundError } from '@/errors/not-found.error';
import type { CategoryInsert, CategorySelect } from '@infra/database/models/category.schema';

export class CategoryService implements ICategoryService {
  constructor(private readonly dao: ICategoryDAO) {}

  async getAll(): Promise<CategorySelect[]> {
    return this.dao.findAll();
  }

  async getById({ id }: { id: number }): Promise<CategorySelect> {
    const item = await this.dao.findById({ id });
    if (!item) throw new NotFoundError('Category', String(id));
    return item;
  }

  async create({ data }: { data: CategoryInsert }): Promise<CategorySelect> {
    return this.dao.create({ data });
  }

  async update({ id, data }: { id: number; data: Partial<CategoryInsert> }): Promise<CategorySelect> {
    const item = await this.dao.update({ id, data });
    if (!item) throw new NotFoundError('Category', String(id));
    return item;
  }

  async delete({ id }: { id: number }): Promise<boolean> {
    const item = await this.dao.findById({ id });
    if (!item) throw new NotFoundError('Category', String(id));
    return this.dao.delete({ id });
  }
}
