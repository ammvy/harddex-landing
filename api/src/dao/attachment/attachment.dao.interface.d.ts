import type { AttachmentSelect, AttachmentInsert } from '@infra/database/models/attachment.schema';

export interface IAttachmentDAO {
  findAll(): Promise<AttachmentSelect[]>;
  findById({ id }: { id: number }): Promise<AttachmentSelect | null>;
  create({ data }: { data: AttachmentInsert }): Promise<AttachmentSelect>;
  update({ id, data }: { id: number; data: Partial<AttachmentInsert> }): Promise<AttachmentSelect | null>;
  delete({ id }: { id: number }): Promise<boolean>;
}
