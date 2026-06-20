import { IReviewDAO } from '@/dao/review/review.dao.interface';
import type { IReviewService } from './review.service.interface';
import { NotFoundError } from '@/errors/not-found.error';
import type { ReviewInsert, ReviewSelect } from '@infra/database/models/review.schema';

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

  async create({ data }: { data: ReviewInsert }): Promise<ReviewSelect> {
    return this.dao.create({ data });
  }

  async update({ id, data }: { id: number; data: Partial<ReviewInsert> }): Promise<ReviewSelect> {
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
