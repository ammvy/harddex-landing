import type { IReviewDAO } from './review.dao.interface';
import { eq } from 'drizzle-orm';
import { reviews, type ReviewSelect, type ReviewInsert } from '@infra/database/models/review.schema';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class ReviewDAO implements IReviewDAO {
  constructor(private readonly db: NodePgDatabase<any>) {}

  async findAll(): Promise<ReviewSelect[]> {
    const rows = await this.db.select().from(reviews);
    return rows as ReviewSelect[];
  }

  async findById({ id }: { id: number }): Promise<ReviewSelect | null> {
    const rows = await this.db.select().from(reviews).where(eq(reviews.id, id));
    return (rows[0] ?? null) as ReviewSelect | null;
  }

  async create({ data }: { data: ReviewInsert }): Promise<ReviewSelect> {
    const rows = await this.db.insert(reviews).values(data).returning();
    return rows[0] as ReviewSelect;
  }

  async update({ id, data }: { id: number; data: Partial<ReviewInsert> }): Promise<ReviewSelect | null> {
    const rows = await this.db.update(reviews).set(data).where(eq(reviews.id, id)).returning();
    return (rows[0] ?? null) as ReviewSelect | null;
  }

  async delete({ id }: { id: number }): Promise<boolean> {
    const rows = await this.db.delete(reviews).where(eq(reviews.id, id)).returning();
    return rows.length > 0;
  }
}
