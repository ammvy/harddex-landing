import type { ManufacturerInsert, ManufacturerSelect } from '@infra/database/models/manufacturer.schema';

export interface IManufacturerService {
  getAll(): Promise<ManufacturerSelect[]>;
  getById({ id }: { id: number }): Promise<ManufacturerSelect>;
  create({ data }: { data: ManufacturerInsert }): Promise<ManufacturerSelect>;
  update({ id, data }: { id: number; data: Partial<ManufacturerInsert> }): Promise<ManufacturerSelect>;
  delete({ id }: { id: number }): Promise<boolean>;
}
