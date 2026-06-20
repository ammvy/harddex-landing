import type { AttachmentSelect } from '@infra/database/models/attachment.schema';

export type AttachmentCreateInput = {
  name: string;
  url: string;
  brandId?: number | null;
  productId?: number | null;
  componentId?: number | null;
  manufacturerId?: number | null;
};

export type AttachmentUpdateInput = Partial<AttachmentCreateInput>;

export interface IAttachmentService {
  getAll(): Promise<AttachmentSelect[]>;
  getById({ id }: { id: number }): Promise<AttachmentSelect>;
  create({ data }: { data: AttachmentCreateInput }): Promise<AttachmentSelect>;
  update({ id, data }: { id: number; data: AttachmentUpdateInput }): Promise<AttachmentSelect>;
  delete({ id }: { id: number }): Promise<boolean>;
}
