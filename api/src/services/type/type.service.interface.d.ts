import type { TypeSelect } from '@infra/database/models/type.schema';

export type TypeCreateInput = {
  name: string;
  color?: string | null;
};

export type TypeUpdateInput = Partial<TypeCreateInput>;

export interface ITypeService {
  getAll(): Promise<TypeSelect[]>;
  getById({ id }: { id: number }): Promise<TypeSelect>;
  create({ data }: { data: TypeCreateInput }): Promise<TypeSelect>;
  update({ id, data }: { id: number; data: TypeUpdateInput }): Promise<TypeSelect>;
  delete({ id }: { id: number }): Promise<boolean>;
}
