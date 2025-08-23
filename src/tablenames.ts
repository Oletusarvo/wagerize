type Schemas = 'users' | 'bets';
type Tables =
  | 'bid'
  | 'user'
  | 'bet'
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
  bet: tablename('bets', 'bet'),
  user: tablename('users', 'user'),
  user_type: tablename('users', 'user_type'),
  option: tablename('bets', 'option'),
  wallet: tablename('users', 'wallet'),
  currency: tablename('users', 'currency'),
  outcome: tablename('bets', 'outcome'),
  notification: tablename('users', 'notification'),
};
