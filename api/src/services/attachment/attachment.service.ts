import { IAttachmentDAO } from '@/dao/attachment/attachment.dao.interface';
import type { IAttachmentService } from './attachment.service.interface';
import { NotFoundError } from '@/errors/not-found.error';
import type { AttachmentSelect } from '@infra/database/models/attachment.schema';

export class AttachmentService implements IAttachmentService {
  constructor(private readonly dao: IAttachmentDAO) {}

  async getAll(): Promise<AttachmentSelect[]> {
    return this.dao.findAll();
  }

  async getById({ id }: { id: number }): Promise<AttachmentSelect> {
    const item = await this.dao.findById({ id });
    if (!item) throw new NotFoundError('Attachment', String(id));
    return item;
  }

  async create({ data }: { data: any }): Promise<AttachmentSelect> {
    return this.dao.create({ data });
  }

  async update({ id, data }: { id: number; data: any }): Promise<AttachmentSelect> {
    const item = await this.dao.update({ id, data });
    if (!item) throw new NotFoundError('Attachment', String(id));
    return item;
  }

  async delete({ id }: { id: number }): Promise<void> {
    const item = await this.dao.findById({ id });
    if (!item) throw new NotFoundError('Attachment', String(id));
    await this.dao.delete({ id });
  }
}
