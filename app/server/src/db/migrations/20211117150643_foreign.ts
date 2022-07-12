import { Knex } from "knex";
import t from "../data/tables";

/* Create */
export async function up(knex: Knex): Promise<void> {
  /* Foreign Keys */
  await knex.schema.alterTable(t.xmlRegister, (table: Knex.TableBuilder) => {
    table.integer("origin_id").notNullable().references("id").inTable(t.origin);
  });

  await knex.schema.alterTable(t.xmlPath, (table: Knex.TableBuilder) => {
    table.integer("origin_id").notNullable().references("id").inTable(t.origin);
  });

  await knex.schema.alterTable(t.xmlField, (table: Knex.TableBuilder) => {
    table
      .integer("xml_path_id")
      .notNullable()
      .references("id")
      .inTable(t.xmlPath);
  });

  await knex.schema.alterTable(t.xmlContent, (table: Knex.TableBuilder) => {
    table
      .integer("xml_register_id")
      .notNullable()
      .unique()
      .references("id")
      .inTable(t.xmlRegister);
    table.integer("xml_template_id").references("id").inTable(t.xmlTemplate);
    table.integer("xml_path_id").references("id").inTable(t.xmlPath);
  });

  await knex.schema.alterTable(t.xmlTemplate, (table: Knex.TableBuilder) => {
    table
      .integer("xml_content_id")
      .notNullable()
      .unique()
      .references("id")
      .inTable(t.xmlContent);
  });

  await knex.schema.alterTable(t.xmlNow, (table: Knex.TableBuilder) => {
    table
      .integer("xml_content_id")
      .notNullable()
      .unique()
      .references("id")
      .inTable(t.xmlContent);
  });

  await knex.schema.alterTable(t.xmlGmo, (table: Knex.TableBuilder) => {
    table
      .integer("xml_content_id")
      .notNullable()
      .unique()
      .references("id")
      .inTable(t.xmlContent);
  });
}

/* Drop in reverse order */
export async function down(knex: Knex): Promise<void> {
  /* Foreign Keys */
  await knex.schema.alterTable(t.xmlGmo, (table: Knex.TableBuilder) => {
    table.dropColumn("xml_content_id");
  });

  await knex.schema.alterTable(t.xmlNow, (table: Knex.TableBuilder) => {
    table.dropColumn("xml_content_id");
  });

  await knex.schema.alterTable(t.xmlTemplate, (table: Knex.TableBuilder) => {
    table.dropColumn("xml_content_id");
  });

  await knex.schema.alterTable(t.xmlContent, (table: Knex.TableBuilder) => {
    table.dropColumn("xml_register_id");
    table.dropColumn("xml_template_id");
    table.dropColumn("xml_path_id");
  });

  await knex.schema.alterTable(t.xmlField, (table: Knex.TableBuilder) => {
    table.dropColumn("xml_path_id");
  });

  await knex.schema.alterTable(t.xmlRegister, (table: Knex.TableBuilder) => {
    table.dropColumn("origin_id");
  });
}
