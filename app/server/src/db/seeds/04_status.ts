import { Knex } from "knex";
import t from "../data/tables";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(t.trackingStatus).del();

  // Inserts seed entries
  await knex(t.trackingStatus).insert([
    { id: 15, status: "lens recived" },
    { id: 20, status: "waiting for frame" },
    { id: 50, status: "breakage - redo" },
    { id: 55, status: "shipping" },
    { id: 70, status: "complete" },
    { id: 900, status: "cancelled" },
    { id: 999, status: "other" },
  ]);
}
