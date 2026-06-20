import { IReviewDAO } from '@/dao/review/review.dao.interface';
import type { IReviewService, ReviewCreateInput, ReviewUpdateInput } from './review.service.interface';
import { NotFoundError } from '@/errors/not-found.error';
import type { ReviewSelect } from '@infra/database/models/review.schema';

export class ReviewService implements IReviewService {
  constructor(private readonly dao: IReviewDAO) {}

  async getAll(): Promise<ReviewSelect[]> {
    return this.dao.findAll();
  }

  async getById({ id }: { id: number }): Promise<ReviewSelect> {
    const item = await this.dao.findById({ id });
    if (!item) throw new NotFoundError('Review', String(id));
    return item;
  }

  async create({ data }: { data: ReviewCreateInput }): Promise<ReviewSelect> {
    return this.dao.create({ data });
  }

  async update({ id, data }: { id: number; data: ReviewUpdateInput }): Promise<ReviewSelect> {
    const item = await this.dao.update({ id, data });
    if (!item) throw new NotFoundError('Review', String(id));
    return item;
  }

  async delete({ id }: { id: number }): Promise<boolean> {
    const item = await this.dao.findById({ id });
    if (!item) throw new NotFoundError('Review', String(id));
    return this.dao.delete({ id });
  }
}
