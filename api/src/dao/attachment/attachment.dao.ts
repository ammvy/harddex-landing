import type { IAttachmentDAO } from './attachment.dao.interface';
import { eq } from 'drizzle-orm';
import { attachments, type AttachmentSelect, type AttachmentInsert } from '@infra/database/models/attachment.schema';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class AttachmentDAO implements IAttachmentDAO {
  constructor(private readonly db: NodePgDatabase<any>) {}

  async findAll(): Promise<AttachmentSelect[]> {
    const rows = await this.db.select().from(attachments);
    return rows as AttachmentSelect[];
  }

  async findById({ id }: { id: number }): Promise<AttachmentSelect | null> {
    const rows = await this.db.select().from(attachments).where(eq(attachments.id, id));
    return (rows[0] ?? null) as AttachmentSelect | null;
  }

  async create({ data }: { data: AttachmentInsert }): Promise<AttachmentSelect> {
    const rows = await this.db.insert(attachments).values(data).returning();
    return rows[0] as AttachmentSelect;
  }

  async update({ id, data }: { id: number; data: Partial<AttachmentInsert> }): Promise<AttachmentSelect | null> {
    const rows = await this.db.update(attachments).set(data).where(eq(attachments.id, id)).returning();
    return (rows[0] ?? null) as AttachmentSelect | null;
  }

  async delete({ id }: { id: number }): Promise<boolean> {
    const rows = await this.db.delete(attachments).where(eq(attachments.id, id)).returning();
    return rows.length > 0;
  }
}
