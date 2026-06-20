import type { ManufacturerSelect, ManufacturerInsert } from '@infra/database/models/manufacturer.schema';

export interface IManufacturerDAO {
  findAll(): Promise<ManufacturerSelect[]>;
  findById({ id }: { id: number }): Promise<ManufacturerSelect | null>;
  create({ data }: { data: ManufacturerInsert }): Promise<ManufacturerSelect>;
  update({ id, data }: { id: number; data: Partial<ManufacturerInsert> }): Promise<ManufacturerSelect | null>;
  delete({ id }: { id: number }): Promise<boolean>;
}
