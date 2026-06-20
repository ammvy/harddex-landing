import type { TypeSelect } from '@infra/database/models/type.schema';

export interface ITypeService {
  getAll(): Promise<TypeSelect[]>;
  getById({ id }: { id: number }): Promise<TypeSelect>;
  create({ data }: { data: any }): Promise<TypeSelect>;
  update({ id, data }: { id: number; data: any }): Promise<TypeSelect>;
  delete({ id }: { id: number }): Promise<void>;
}
