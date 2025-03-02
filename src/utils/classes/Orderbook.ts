import db from 'betting_app/dbconfig';

export class Orderbook {
  private betId: string;
  constructor(betId: string) {
    this.betId = betId;
  }

  async sell(order: any) {
    await db('bets.seller').insert({
      bet_id: this.betId,
      option_id: order.option_id,
      size: order.size,
    });
  }
}
