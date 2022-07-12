import { Knex } from "knex";
import t from "../data/tables";

export async function seed(knex: Knex): Promise<void> {
  /* Deletes ALL existing entries */
  await knex(t.origin).del();

  /* Inserts seed entries */
  await knex(t.origin).insert([
    { id: 1, origin: "now" },
    { id: 2, origin: "gmo" },
  ]);
}
