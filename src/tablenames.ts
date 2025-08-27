type Schemas = 'users' | 'bets';
type Tables =
  | 'bid'
  | 'bid_status'
  | 'user'
  | 'user_subscription'
  | 'bet'
  | 'bet_status'
  | 'bet_metadata'
  | 'currency'
  | 'wallet'
  | 'outcome'
  | 'user_type'
  | 'option'
  | 'notification';

const tablename = <ST extends Schemas, TT extends Tables>(schema: ST, table: TT) =>
  `${schema}.${table}` as `${ST}.${TT}`;

export const tablenames = {
  bid: tablename('bets', 'bid'),
  bid_status: tablename('bets', 'bid_status'),
  bet: tablename('bets', 'bet'),
  bet_metadata: tablename('bets', 'bet_metadata'),
  bet_status: tablename('bets', 'bet_status'),
  user: tablename('users', 'user'),
  user_type: tablename('users', 'user_type'),
  user_subscription: tablename('users', 'user_subscription'),
  bet_option: tablename('bets', 'outcome'),
  wallet: tablename('users', 'wallet'),
  currency: tablename('users', 'currency'),
  outcome: tablename('bets', 'outcome'),
  notification: tablename('users', 'notification'),
};
