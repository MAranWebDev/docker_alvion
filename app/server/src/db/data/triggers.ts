/* Triggers */
const triggers = {
  /* Functions */
  createUpdateTimestamp: `
		CREATE OR REPLACE FUNCTION update_timestamp() RETURNS TRIGGER AS $$ 
		BEGIN 
			NEW.updated_at = CURRENT_TIMESTAMP; 
			RETURN NEW; 
		END; 
		$$ LANGUAGE plpgsql`,

  /* Methods */
  updateTimestamp: (table: string) =>
    `CREATE TRIGGER update_timestamp BEFORE UPDATE ON ${table} 
		FOR EACH ROW EXECUTE PROCEDURE update_timestamp();`,
};

export default triggers;
