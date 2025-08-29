import { DBContext } from '@/db-context';
import { tablenames } from '@/tablenames';
import { TUserSubscription } from '../schemas/user-subscription';

export class UserRepository {
  async getSubscriptionByUserId(user_id: string, ctx: DBContext): Promise<TUserSubscription> {
    return await ctx(tablenames.user_subscription)
      .where({
        id: ctx
          .select('user_subscription_id')
          .from(tablenames.user)
          .where({ id: user_id })
          .limit(1),
      })
      .first();
  }

  async getIdByEmail(email: string, ctx: DBContext): Promise<string | undefined> {
    const [result] = await ctx(tablenames.user).where({ email }).pluck('id');
    return result;
  }

  async findByEmail(email: string, ctx: DBContext) {
    return ctx(tablenames.user).where({ email }).first();
  }

  async updateByUserId(user_id: string, payload: any, ctx: DBContext) {
    await ctx(tablenames.user).where({ id: user_id }).update(payload);
  }
}
