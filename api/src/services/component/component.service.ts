import { IComponentDAO } from '@/dao/component/component.dao.interface';
import type { IComponentService } from './component.service.interface';
import { NotFoundError } from '@/errors/not-found.error';
import type { ComponentSelect } from '@infra/database/models/component.schema';

export class ComponentService implements IComponentService {
  constructor(private readonly dao: IComponentDAO) {}

  async getAll(): Promise<ComponentSelect[]> {
    return this.dao.findAll();
  }

  async getById({ id }: { id: number }): Promise<ComponentSelect> {
    const item = await this.dao.findById({ id });
    if (!item) throw new NotFoundError('Component', String(id));
    return item;
  }

  async create({ data }: { data: any }): Promise<ComponentSelect> {
    return this.dao.create({ data });
  }

  async update({ id, data }: { id: number; data: any }): Promise<ComponentSelect> {
    const item = await this.dao.update({ id, data });
    if (!item) throw new NotFoundError('Component', String(id));
    return item;
  }

  async delete({ id }: { id: number }): Promise<void> {
    const item = await this.dao.findById({ id });
    if (!item) throw new NotFoundError('Component', String(id));
    await this.dao.delete({ id });
  }
}
