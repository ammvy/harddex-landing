import { IProductDAO } from "@/dao/product/product.dao.interface";
import type {
  ProductCreateInput,
  ProductUpdateInput,
  IProductService,
} from "./product.service.interface";
import { NotFoundError } from "@/errors/not-found.error";
import type { ProductSelect } from "@infra/database/models/product.schema";

export class ProductService implements IProductService {
  constructor(private readonly dao: IProductDAO) {}

  async getAll(options?: { detailed?: boolean }): Promise<ProductSelect[] | any[]> {
    return this.dao.findAll(options);
  }

  async getById({ id }: { id: number }): Promise<ProductSelect> {
    const item = await this.dao.findById({ id });
    if (!item) throw new NotFoundError("Product", String(id));
    return item;
  }

  async create({ data }: { data: ProductCreateInput }): Promise<ProductSelect> {
    return this.dao.create({ data });
  }

  async update({
    id,
    data,
  }: {
    id: number;
    data: ProductUpdateInput;
  }): Promise<ProductSelect> {
    const item = await this.dao.update({ id, data });
    if (!item) throw new NotFoundError("Product", String(id));
    return item;
  }

  async delete({ id }: { id: number }): Promise<boolean> {
    const item = await this.dao.findById({ id });
    if (!item) throw new NotFoundError("Product", String(id));
    return this.dao.delete({ id });
  }
}
