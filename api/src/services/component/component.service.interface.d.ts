import type { ComponentSelect } from '@infra/database/models/component.schema';

export type ComponentCreateInput = {
  name: string;
  specification?: unknown;
  description?: string | null;
  averagePrice?: number | null;
  productId: number;
  typeId?: number | null;
  manufacturerId?: number | null;
};

export type ComponentUpdateInput = Partial<ComponentCreateInput>;

export interface IComponentService {
  getAll(): Promise<ComponentSelect[]>;
  getById({ id }: { id: number }): Promise<ComponentSelect>;
  create({ data }: { data: ComponentCreateInput }): Promise<ComponentSelect>;
  update({ id, data }: { id: number; data: ComponentUpdateInput }): Promise<ComponentSelect>;
  delete({ id }: { id: number }): Promise<boolean>;
}
