import type { ReviewSelect } from '@infra/database/models/review.schema';

export type ReviewCreateInput = {
  rating: number;
  comment?: string | null;
  userId: number;
  productId: number;
};

export type ReviewUpdateInput = Partial<ReviewCreateInput>;

export interface IReviewService {
  getAll(): Promise<ReviewSelect[]>;
  getById({ id }: { id: number }): Promise<ReviewSelect>;
  create({ data }: { data: ReviewCreateInput }): Promise<ReviewSelect>;
  update({ id, data }: { id: number; data: ReviewUpdateInput }): Promise<ReviewSelect>;
  delete({ id }: { id: number }): Promise<boolean>;
}
