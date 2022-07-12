import { Knex } from "knex";
import t from "../data/tables";
import values from "../data/fieldValues";

export async function seed(knex: Knex): Promise<void> {
  /* Deletes ALL existing entries */
  await knex(t.xmlField).del();

  /* Inserts seed entries */
  await knex(t.xmlField).insert(values);
}
