import type { IUserDAO } from '@/dao/user.dao';
import type { UserSelect } from '@infra/database/schema/user.schema';

// ── Interface ──
export interface IUserRepository {
  findAll(): Promise<UserSelect[]>;
  findById(id: string): Promise<UserSelect | null>;
  findByEmail(email: string): Promise<UserSelect | null>;
  create(data: { name: string; email: string; avatarUrl?: string }): Promise<UserSelect>;
  update(id: string, data: Partial<{ name: string; email: string; avatarUrl: string }>): Promise<UserSelect | null>;
  delete(id: string): Promise<boolean>;
  existsByEmail(email: string): Promise<boolean>;
}

// ── Implementação ──
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
