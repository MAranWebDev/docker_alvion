import { Knex } from "knex";
import t from "../data/tables";

export async function seed(knex: Knex): Promise<void> {
  /* Deletes ALL existing entries */
  await knex(t.xmlPath).del();

  /* Inserts seed entries */
  await knex(t.xmlPath).insert([
    { id: 1, path: "now", origin_id: 1 },
    { id: 2, path: "gmo sin montaje", origin_id: 2 },
    { id: 3, path: "gmo con montaje", origin_id: 2 },
  ]);
}
