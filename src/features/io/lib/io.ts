import 'server-only';

type MessageT = { to?: string } & (
  | {
      message: 'bet:update';
      payload: {
        pool: number;
        id: string;
        min_bid: number;
      };
    }
  | {
      message: 'bid:update';
      payload: {
        amount: number;
        id: string;
      };
    }
  | {
      message: 'bet:bid_placed';
      payload: {
        user_id: string;
        bet_id: string;
        amount: string;
      };
    }
);

class IO {
  dispatch(msg: MessageT) {
    const { to, payload, message } = msg;
    if (to) {
      global.ioServer.to(to).emit(message, payload);
    } else {
      global.ioServer.emit(message, payload);
    }
  }
}

export const io = new IO();
