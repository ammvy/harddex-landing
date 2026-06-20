import type { AttachmentSelect } from '@infra/database/models/attachment.schema';

export interface IAttachmentService {
  getAll(): Promise<AttachmentSelect[]>;
  getById({ id }: { id: number }): Promise<AttachmentSelect>;
  create({ data }: { data: any }): Promise<AttachmentSelect>;
  update({ id, data }: { id: number; data: any }): Promise<AttachmentSelect>;
  delete({ id }: { id: number }): Promise<void>;
}
