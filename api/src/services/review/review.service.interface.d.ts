import type { ReviewSelect } from '@infra/database/models/review.schema';

export interface IReviewService {
  getAll(): Promise<ReviewSelect[]>;
  getById({ id }: { id: number }): Promise<ReviewSelect>;
  create({ data }: { data: any }): Promise<ReviewSelect>;
  update({ id, data }: { id: number; data: any }): Promise<ReviewSelect>;
  delete({ id }: { id: number }): Promise<void>;
}
