import { IProductDAO } from '@/dao/product/product.dao.interface';
import type { IProductService } from './product.service.interface';
import { NotFoundError } from '@/errors/not-found.error';
import type { ProductInsert, ProductSelect } from '@infra/database/models/product.schema';

export class ProductService implements IProductService {
  constructor(private readonly dao: IProductDAO) {}

  async getAll(): Promise<ProductSelect[]> {
    return this.dao.findAll();
  }

  async getById({ id }: { id: number }): Promise<ProductSelect> {
    const item = await this.dao.findById({ id });
    if (!item) throw new NotFoundError('Product', String(id));
    return item;
  }

  async create({ data }: { data: ProductInsert }): Promise<ProductSelect> {
    return this.dao.create({ data });
  }

  async update({ id, data }: { id: number; data: Partial<ProductInsert> }): Promise<ProductSelect> {
    const item = await this.dao.update({ id, data });
    if (!item) throw new NotFoundError('Product', String(id));
    return item;
  }

  async delete({ id }: { id: number }): Promise<boolean> {
    const item = await this.dao.findById({ id });
    if (!item) throw new NotFoundError('Product', String(id));
    return this.dao.delete({ id });
  }
}
