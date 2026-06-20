import { IManufacturerDAO } from '@/dao/manufacturer/manufacturer.dao.interface';
import type { IManufacturerService } from './manufacturer.service.interface';
import { NotFoundError } from '@/errors/not-found.error';
import type { ManufacturerSelect } from '@infra/database/models/manufacturer.schema';

export class ManufacturerService implements IManufacturerService {
  constructor(private readonly dao: IManufacturerDAO) {}

  async getAll(): Promise<ManufacturerSelect[]> {
    return this.dao.findAll();
  }

  async getById({ id }: { id: number }): Promise<ManufacturerSelect> {
    const item = await this.dao.findById({ id });
    if (!item) throw new NotFoundError('Manufacturer', String(id));
    return item;
  }

  async create({ data }: { data: any }): Promise<ManufacturerSelect> {
    return this.dao.create({ data });
  }

  async update({ id, data }: { id: number; data: any }): Promise<ManufacturerSelect> {
    const item = await this.dao.update({ id, data });
    if (!item) throw new NotFoundError('Manufacturer', String(id));
    return item;
  }

  async delete({ id }: { id: number }): Promise<void> {
    const item = await this.dao.findById({ id });
    if (!item) throw new NotFoundError('Manufacturer', String(id));
    await this.dao.delete({ id });
  }
}
