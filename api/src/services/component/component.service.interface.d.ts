import type { ComponentSelect } from '@infra/database/models/component.schema';

export interface IComponentService {
  getAll(): Promise<ComponentSelect[]>;
  getById({ id }: { id: number }): Promise<ComponentSelect>;
  create({ data }: { data: any }): Promise<ComponentSelect>;
  update({ id, data }: { id: number; data: any }): Promise<ComponentSelect>;
  delete({ id }: { id: number }): Promise<void>;
}
