import { ITypeDAO } from '@/dao/type/type.dao.interface';
import type { ITypeService } from './type.service.interface';
import { NotFoundError } from '@/errors/not-found.error';
import type { TypeInsert, TypeSelect } from '@infra/database/models/type.schema';

export class TypeService implements ITypeService {
  constructor(private readonly dao: ITypeDAO) {}

  async getAll(): Promise<TypeSelect[]> {
    return this.dao.findAll();
  }

  async getById({ id }: { id: number }): Promise<TypeSelect> {
    const item = await this.dao.findById({ id });
    if (!item) throw new NotFoundError('Type', String(id));
    return item;
  }

  async create({ data }: { data: TypeInsert }): Promise<TypeSelect> {
    return this.dao.create({ data });
  }

  async update({ id, data }: { id: number; data: Partial<TypeInsert> }): Promise<TypeSelect> {
    const item = await this.dao.update({ id, data });
    if (!item) throw new NotFoundError('Type', String(id));
    return item;
  }

  async delete({ id }: { id: number }): Promise<boolean> {
    const item = await this.dao.findById({ id });
    if (!item) throw new NotFoundError('Type', String(id));
    return this.dao.delete({ id });
  }
}
