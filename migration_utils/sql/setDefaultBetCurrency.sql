CREATE OR REPLACE FUNCTION set_default_bet_currency()
RETURNS TRIGGER AS $$
  BEGIN
    IF NEW.currency_id IS NULL THEN 
      NEW.currency_id := (SELECT id FROM users.currency WHERE symbol = 'DICE' LIMIT 1);
    END IF;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER set_default_bet_currency
BEFORE INSERT ON bets.bet
FOR EACH ROW
EXECUTE FUNCTION set_default_bet_currency();