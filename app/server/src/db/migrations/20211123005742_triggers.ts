import { Knex } from "knex";
import t from "../data/tables";
import triggers from "../data/triggers";

/* Create */
export async function up(knex: Knex): Promise<void> {
  /* Functions */
  await knex.raw(triggers.createUpdateTimestamp);

  /* Triggers */
  await knex.raw(triggers.updateTimestamp(t.xmlRegister));
  await knex.raw(triggers.updateTimestamp(t.xmlContent));
  await knex.raw(triggers.updateTimestamp(t.xmlNow));
  await knex.raw(triggers.updateTimestamp(t.xmlGmo));
}

/* Drop in reverse order */
export async function down(knex: Knex): Promise<void> {
  /* Functions */
  await knex.raw(`DROP FUNCTION IF EXISTS update_timestamp() CASCADE;`);
}
