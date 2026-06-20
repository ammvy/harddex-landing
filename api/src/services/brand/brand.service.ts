import { IBrandDAO } from '@/dao/brand/brand.dao.interface';
import type { IBrandService } from './brand.service.interface';
import { NotFoundError } from '@/errors/not-found.error';
import type { BrandInsert, BrandSelect } from '@infra/database/models/brand.schema';

export class BrandService implements IBrandService {
  constructor(private readonly dao: IBrandDAO) {}

  async getAll(): Promise<BrandSelect[]> {
    return this.dao.findAll();
  }

  async getById({ id }: { id: number }): Promise<BrandSelect> {
    const item = await this.dao.findById({ id });
    if (!item) throw new NotFoundError('Brand', String(id));
    return item;
  }

  async create({ data }: { data: BrandInsert }): Promise<BrandSelect> {
    return this.dao.create({ data });
  }

  async update({ id, data }: { id: number; data: Partial<BrandInsert> }): Promise<BrandSelect> {
    const item = await this.dao.update({ id, data });
    if (!item) throw new NotFoundError('Brand', String(id));
    return item;
  }

  async delete({ id }: { id: number }): Promise<boolean> {
    const item = await this.dao.findById({ id });
    if (!item) throw new NotFoundError('Brand', String(id));
    return this.dao.delete({ id });
  }
}
