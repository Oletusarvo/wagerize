import { Service } from '@/utils/service';
import { TBid } from '../schemas/bid-schema';
import { DBContext } from '@/db-context';
import { BidRepository } from '../repos/bid-repository';
import { userService } from '@/features/users/services/user-service';
import { BidError } from '../error/bid-error';

class BidService extends Service<BidRepository> {
  constructor(repo: BidRepository) {
    super(repo);
  }

  async verifyBidQuota(user_id: string, ctx: DBContext) {
    const bidCount = await this.repo.countByUserId(user_id, ctx);
    const subscription = await userService.repo.getSubscriptionByUserId(user_id, ctx);
    if (bidCount >= subscription.max_bids) {
      throw new Error(BidError.QUOTA_FULL);
    }
  }
}

export const bidService = new BidService(new BidRepository());
