import type { ManufacturerSelect } from '@infra/database/models/manufacturer.schema';

export interface IManufacturerService {
  getAll(): Promise<ManufacturerSelect[]>;
  getById({ id }: { id: number }): Promise<ManufacturerSelect>;
  create({ data }: { data: any }): Promise<ManufacturerSelect>;
  update({ id, data }: { id: number; data: any }): Promise<ManufacturerSelect>;
  delete({ id }: { id: number }): Promise<void>;
}
