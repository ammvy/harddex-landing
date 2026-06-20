import type { TypeSelect, TypeInsert } from '@infra/database/models/type.schema';

export interface ITypeDAO {
  findAll(): Promise<TypeSelect[]>;
  findById({ id }: { id: number }): Promise<TypeSelect | null>;
  create({ data }: { data: TypeInsert }): Promise<TypeSelect>;
  update({ id, data }: { id: number; data: Partial<TypeInsert> }): Promise<TypeSelect | null>;
  delete({ id }: { id: number }): Promise<boolean>;
}
