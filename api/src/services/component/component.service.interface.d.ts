import type { ComponentInsert, ComponentSelect } from '@infra/database/models/component.schema';

export type ComponentCreateInput = ComponentInsert;
export type ComponentUpdateInput = Partial<ComponentInsert>;

export interface IComponentService {
  getAll(): Promise<ComponentSelect[]>;
  getById({ id }: { id: number }): Promise<ComponentSelect>;
  create({ data }: { data: ComponentCreateInput }): Promise<ComponentSelect>;
  update({ id, data }: { id: number; data: ComponentUpdateInput }): Promise<ComponentSelect>;
  delete({ id }: { id: number }): Promise<boolean>;
}
