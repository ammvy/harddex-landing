import type { ComponentSelect, ComponentInsert } from '@infra/database/models/component.schema';

export interface IComponentDAO {
  findAll(): Promise<ComponentSelect[]>;
  findById({ id }: { id: number }): Promise<ComponentSelect | null>;
  create({ data }: { data: ComponentInsert }): Promise<ComponentSelect>;
  update({ id, data }: { id: number; data: Partial<ComponentInsert> }): Promise<ComponentSelect | null>;
  delete({ id }: { id: number }): Promise<boolean>;
}
