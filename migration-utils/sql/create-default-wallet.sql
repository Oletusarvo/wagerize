CREATE OR REPLACE FUNCTION create_default_wallet()
RETURNS TRIGGER AS $$ 
  BEGIN   
    INSERT INTO users.wallet (user_id, currency_id) VALUES (NEW.id, (SELECT id FROM users.currency WHERE symbol = 'DICE' LIMIT 1));
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER create_default_wallet 
AFTER INSERT ON users.user 
FOR EACH ROW 
EXECUTE FUNCTION create_default_wallet();