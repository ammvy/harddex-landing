import type { AttachmentInsert, AttachmentSelect } from '@infra/database/models/attachment.schema';

export interface IAttachmentService {
  getAll(): Promise<AttachmentSelect[]>;
  getById({ id }: { id: number }): Promise<AttachmentSelect>;
  create({ data }: { data: AttachmentInsert }): Promise<AttachmentSelect>;
  update({ id, data }: { id: number; data: Partial<AttachmentInsert> }): Promise<AttachmentSelect>;
  delete({ id }: { id: number }): Promise<boolean>;
}
