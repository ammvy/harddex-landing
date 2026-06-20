import type { ReviewSelect, ReviewInsert } from '@infra/database/models/review.schema';

export interface IReviewDAO {
  findAll(): Promise<ReviewSelect[]>;
  findById({ id }: { id: number }): Promise<ReviewSelect | null>;
  create({ data }: { data: ReviewInsert }): Promise<ReviewSelect>;
  update({ id, data }: { id: number; data: Partial<ReviewInsert> }): Promise<ReviewSelect | null>;
  delete({ id }: { id: number }): Promise<boolean>;
}
