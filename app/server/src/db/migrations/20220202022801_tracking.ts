import { Knex } from "knex";
import t from "../data/tables";
import triggers from "../data/triggers";

/* Create */
export async function up(knex: Knex): Promise<void> {
  /* Tables */
  await knex.schema.createTable(
    t.trackingStatus,
    (table: Knex.TableBuilder) => {
      table.increments();
      table.string("status").notNullable().unique();
    }
  );

  await knex.schema.createTable(t.trackingNow, (table: Knex.TableBuilder) => {
    table.increments();
    table.timestamps(true, true);
    table.boolean("imported").notNullable().defaultTo(false);
    table.string("item_type").notNullable();
    table.string("item_tracking_id").notNullable();
    table.string("item_visionweb_tracking_id").notNullable();
    table.timestamp("item_received_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("item_estimated_delivery");
    table.string("status_description").notNullable().defaultTo("");
  });

  /* Foreign Keys */
  await knex.schema.alterTable(t.trackingNow, (table: Knex.TableBuilder) => {
    table
      .integer("tracking_status_id")
      .notNullable()
      .references("id")
      .inTable(t.trackingStatus);
  });

  /* Triggers */
  await knex.raw(triggers.updateTimestamp(t.trackingNow));
}

/* Drop in reverse order */
export async function down(knex: Knex): Promise<void> {
  /* Foreign Keys */
  await knex.schema.alterTable(t.trackingNow, (table: Knex.TableBuilder) => {
    table.dropColumn("tracking_status_id");
  });

  /* Tables */
  await knex.schema.dropTable(t.trackingNow);
  await knex.schema.dropTable(t.trackingStatus);
}
