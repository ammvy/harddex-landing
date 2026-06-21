import { IAttachmentDAO } from '@/dao/attachment/attachment.dao.interface';
import type { AttachmentCreateInput, AttachmentUpdateInput, IAttachmentService } from './attachment.service.interface';
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

  async create({ data }: { data: AttachmentCreateInput }): Promise<AttachmentSelect> {
    return this.dao.create({ data });
  }

  async update({ id, data }: { id: number; data: AttachmentUpdateInput }): Promise<AttachmentSelect> {
    const item = await this.dao.update({ id, data });
    if (!item) throw new NotFoundError('Attachment', String(id));
    return item;
  }

  async delete({ id }: { id: number }): Promise<boolean> {
    const item = await this.dao.findById({ id });
    if (!item) throw new NotFoundError('Attachment', String(id));
    return this.dao.delete({ id });
  }
}
