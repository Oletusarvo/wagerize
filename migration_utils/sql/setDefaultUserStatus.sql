CREATE OR REPLACE FUNCTION set_default_user_status()
RETURNS TRIGGER AS $$
  BEGIN
    IF NEW.user_status_id IS NULL THEN 
      NEW.user_status_id := (SELECT id FROM users.user_status WHERE label = 'Pending');
    END IF;

    RETURN NEW;
  END
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER set_default_user_status
BEFORE INSERT ON users.user 
FOR EACH ROW 
EXECUTE FUNCTION set_default_user_status();