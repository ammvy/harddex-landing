import type { ReviewInsert, ReviewSelect } from '@infra/database/models/review.schema';

export interface IReviewService {
  getAll(): Promise<ReviewSelect[]>;
  getById({ id }: { id: number }): Promise<ReviewSelect>;
  create({ data }: { data: ReviewInsert }): Promise<ReviewSelect>;
  update({ id, data }: { id: number; data: Partial<ReviewInsert> }): Promise<ReviewSelect>;
  delete({ id }: { id: number }): Promise<boolean>;
}
