import type { ManufacturerSelect } from '@infra/database/models/manufacturer.schema';

export type ManufacturerCreateInput = {
  name: string;
};

export type ManufacturerUpdateInput = Partial<ManufacturerCreateInput>;

export interface IManufacturerService {
  getAll(): Promise<ManufacturerSelect[]>;
  getById({ id }: { id: number }): Promise<ManufacturerSelect>;
  create({ data }: { data: ManufacturerCreateInput }): Promise<ManufacturerSelect>;
  update({ id, data }: { id: number; data: ManufacturerUpdateInput }): Promise<ManufacturerSelect>;
  delete({ id }: { id: number }): Promise<boolean>;
}
