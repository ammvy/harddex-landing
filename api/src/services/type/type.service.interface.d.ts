import type { TypeInsert, TypeSelect } from '@infra/database/models/type.schema';

export interface ITypeService {
  getAll(): Promise<TypeSelect[]>;
  getById({ id }: { id: number }): Promise<TypeSelect>;
  create({ data }: { data: TypeInsert }): Promise<TypeSelect>;
  update({ id, data }: { id: number; data: Partial<TypeInsert> }): Promise<TypeSelect>;
  delete({ id }: { id: number }): Promise<boolean>;
}
