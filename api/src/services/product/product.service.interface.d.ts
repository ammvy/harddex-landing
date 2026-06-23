import type { ProductSelect } from "@infra/database/models/product.schema";

export type ProductCreateInput = {
  name: string;
  description?: string | null;
  averagePrice?: number | null;
  brandId?: number | null;
  categoryId?: number | null;
};

export type ProductUpdateInput = Partial<ProductCreateInput>;

export interface IProductService {
  getAll(): Promise<ProductSelect[]>;
  getById({ id }: { id: number }): Promise<ProductSelect>;
  create({ data }: { data: ProductCreateInput }): Promise<ProductSelect>;
  update({
    id,
    data,
  }: {
    id: number;
    data: ProductUpdateInput;
  }): Promise<ProductSelect>;
  delete({ id }: { id: number }): Promise<boolean>;
}
