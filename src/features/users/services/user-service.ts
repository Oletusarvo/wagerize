import { DBContext } from '@/db-context';
import { UserRepository } from '../repos/user-repository';
import { Service } from '@/utils/service';
import { hashPassword } from '@/utils/hash-password';

class UserService extends Service<UserRepository> {
  constructor(repo: TODO) {
    super(repo);
  }

  async updatePassword(user_id: string, newPassword: string, ctx: DBContext) {
    await this.repo.updateByUserId(
      user_id,
      {
        password: await hashPassword(newPassword),
      },
      ctx
    );
  }
}

export const userService = new UserService(new UserRepository());
