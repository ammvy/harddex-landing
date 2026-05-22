import type { IUserRepository } from './user.repository.interface';
import type { IUserDAO } from '@/dao/user/user.dao.interface';

export class UserRepository implements IUserRepository {
  constructor(private readonly dao: IUserDAO) {}

  findAll() {
    return this.dao.findAll();
  }

  findById(id: string) {
    return this.dao.findById(id);
  }

  findByEmail(email: string) {
    return this.dao.findByEmail(email);
  }

  create(data: { name: string; email: string; avatarUrl?: string }) {
    return this.dao.create(data);
  }

  update(id: string, data: Partial<{ name: string; email: string; avatarUrl: string }>) {
    return this.dao.update(id, data);
  }

  delete(id: string) {
    return this.dao.delete(id);
  }

  async existsByEmail(email: string) {
    const user = await this.dao.findByEmail(email);
    return user !== null;
  }
}
