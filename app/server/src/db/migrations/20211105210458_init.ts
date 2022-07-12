import { Knex } from "knex";
import t from "../data/tables";

/* Create */
export async function up(knex: Knex): Promise<void> {
  /* Tables */
  await knex.schema.createTable(t.origin, (table: Knex.TableBuilder) => {
    table.increments();
    table.string("origin").notNullable().unique();
  });

  await knex.schema.createTable(t.xmlRegister, (table: Knex.TableBuilder) => {
    table.increments();
    table.timestamps(true, true);
    table.string("filename").notNullable().unique();
    table.timestamp("filedate").notNullable().defaultTo(knex.fn.now());
    table.boolean("imported").notNullable().defaultTo(false);
  });

  await knex.schema.createTable(t.xmlPath, (table: Knex.TableBuilder) => {
    table.increments();
    table.string("path").notNullable().unique();
  });

  await knex.schema.createTable(t.xmlField, (table: Knex.TableBuilder) => {
    table.increments();
    table.string("field").notNullable();
    table.text("fieldpath").notNullable();
  });

  await knex.schema.createTable(t.xmlContent, (table: Knex.TableBuilder) => {
    table.increments();
    table.timestamps(true, true);
    table.specificType("content", "xml").notNullable();
    table.boolean("imported").notNullable().defaultTo(false);
    table.boolean("prepared").notNullable().defaultTo(false);
  });

  await knex.schema.createTable(t.xmlTemplate, (table: Knex.TableBuilder) => {
    table.increments();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table
      .specificType("template", "character varying[]")
      .notNullable()
      .unique();
  });

  await knex.schema.createTable(t.xmlNow, (table: Knex.TableBuilder) => {
    table.increments();
    table.timestamps(true, true);
    table.boolean("imported").notNullable().defaultTo(false);
    table
      .timestamp("rx_spectacle_creation_date")
      .notNullable()
      .defaultTo(knex.fn.now());
    table.string("rx_spectacle_applicationid").notNullable().defaultTo("");
    table.string("rx_spectacle_id").notNullable().defaultTo("");
    table.string("header_purchaseordernumber").notNullable().defaultTo("");
    table.string("customer_loginid").notNullable().defaultTo("");
    table.string("account_name1").notNullable().defaultTo("");
    table.string("account_class1").notNullable().defaultTo("");
    table.string("account_name2").notNullable().defaultTo("");
    table.string("account_class2").notNullable().defaultTo("");
    table.string("customerservice_loginid").notNullable().defaultTo("");
    table.string("promotion_promotionpackageid").notNullable().defaultTo("");
    table
      .string("promotion_promotionpackageorderjoinid")
      .notNullable()
      .defaultTo("");
    table.string("promotion_promotioncode").notNullable().defaultTo("");
    table.string("promotion_promotionname").notNullable().defaultTo("");
    table.string("promotion_paircode").notNullable().defaultTo("");
    table.string("patient_lastname").notNullable().defaultTo("");
    table
      .string("personalized_data_patient_initials")
      .notNullable()
      .defaultTo("");
    table.string("personalized_data_dominanteye").notNullable().defaultTo("");
    table.string("personalized_data_wrapangle").notNullable().defaultTo("");
    table.string("personalized_data_pantoangle").notNullable().defaultTo("");
    table.string("personalized_data_rightercd").notNullable().defaultTo("");
    table.string("personalized_data_rightnvb").notNullable().defaultTo("");
    table.string("personalized_data_leftercd").notNullable().defaultTo("");
    table.string("personalized_data_leftnvb").notNullable().defaultTo("");
    table.string("frame_convert").notNullable().defaultTo("");
    table.string("frame_type").notNullable().defaultTo("");
    table.string("frame_comment").notNullable().defaultTo("");
    table.string("frame_a").notNullable().defaultTo("");
    table.string("frame_b").notNullable().defaultTo("");
    table.string("frame_dbl").notNullable().defaultTo("");
    table.string("frame_supplier_code").notNullable().defaultTo("");
    table.string("position_eye1").notNullable().defaultTo("");
    table.string("position_opticalcenter1").notNullable().defaultTo("");
    table.string("position_boxing_height1").notNullable().defaultTo("");
    table.string("position_fitting_height1").notNullable().defaultTo("");
    table.string("position_far_half_pd1").notNullable().defaultTo("");
    table.string("prescription_sphere1").notNullable().defaultTo("");
    table.string("cylinder_value1").notNullable().defaultTo("");
    table.string("cylinder_axis1").notNullable().defaultTo("");
    table.string("addition_value1").notNullable().defaultTo("");
    table.string("prism_value1").notNullable().defaultTo("");
    table.string("prism_axis1").notNullable().defaultTo("");
    table.string("prism_value2").notNullable().defaultTo("");
    table.string("prism_axis2").notNullable().defaultTo("");
    table.string("decentration_value1").notNullable().defaultTo("");
    table.string("decentration_axis1").notNullable().defaultTo("");
    table.string("lens_convert1").notNullable().defaultTo("");
    table.string("lens_name1").notNullable().defaultTo("");
    table.string("diameter_commercial1").notNullable().defaultTo("");
    table.string("diameter_physical1").notNullable().defaultTo("");
    table.string("diameter_convert1").notNullable().defaultTo("");
    table.string("treatment_name1").notNullable().defaultTo("");
    table.string("treatment_convert1").notNullable().defaultTo("");
    table.string("treatment_name2").notNullable().defaultTo("");
    table.string("treatment_convert2").notNullable().defaultTo("");
    table.string("treatment_name3").notNullable().defaultTo("");
    table.string("treatment_convert3").notNullable().defaultTo("");
    table.string("treatment_name4").notNullable().defaultTo("");
    table.string("treatment_convert4").notNullable().defaultTo("");
    table.string("treatment_name5").notNullable().defaultTo("");
    table.string("treatment_convert5").notNullable().defaultTo("");
    table.string("position_eye2").notNullable().defaultTo("");
    table.string("position_opticalcenter2").notNullable().defaultTo("");
    table.string("position_boxing_height2").notNullable().defaultTo("");
    table.string("position_fitting_height2").notNullable().defaultTo("");
    table.string("position_far_half_pd2").notNullable().defaultTo("");
    table.string("prescription_sphere2").notNullable().defaultTo("");
    table.string("cylinder_value2").notNullable().defaultTo("");
    table.string("cylinder_axis2").notNullable().defaultTo("");
    table.string("addition_value2").notNullable().defaultTo("");
    table.string("prism_value3").notNullable().defaultTo("");
    table.string("prism_axis3").notNullable().defaultTo("");
    table.string("prism_value4").notNullable().defaultTo("");
    table.string("prism_axis4").notNullable().defaultTo("");
    table.string("decentration_value2").notNullable().defaultTo("");
    table.string("decentration_axis2").notNullable().defaultTo("");
    table.string("lens_convert2").notNullable().defaultTo("");
    table.string("lens_name2").notNullable().defaultTo("");
    table.string("diameter_commercial2").notNullable().defaultTo("");
    table.string("diameter_physical2").notNullable().defaultTo("");
    table.string("diameter_convert2").notNullable().defaultTo("");
    table.string("treatment_name6").notNullable().defaultTo("");
    table.string("treatment_convert6").notNullable().defaultTo("");
    table.string("treatment_name7").notNullable().defaultTo("");
    table.string("treatment_convert7").notNullable().defaultTo("");
    table.string("treatment_name8").notNullable().defaultTo("");
    table.string("treatment_convert8").notNullable().defaultTo("");
    table.string("treatment_name9").notNullable().defaultTo("");
    table.string("treatment_convert9").notNullable().defaultTo("");
    table.string("treatment_name10").notNullable().defaultTo("");
    table.string("treatment_convert10").notNullable().defaultTo("");
    table.text("data").notNullable().defaultTo("");
    table.string("jobtype_lensaction").notNullable().defaultTo("");
  });

  await knex.schema.createTable(t.xmlGmo, (table: Knex.TableBuilder) => {
    table.increments();
    table.timestamps(true, true);
    table.boolean("imported").notNullable().defaultTo(false);
    table.date("credat").notNullable().defaultTo(knex.fn.now());
    table.time("cretim").notNullable().defaultTo(knex.fn.now());
    table.date("ihrez").notNullable().defaultTo(knex.fn.now());
    table.string("bname").notNullable().defaultTo("");
    table.string("lifnr").notNullable().defaultTo("");
    table.string("belnr").notNullable().defaultTo("");
    table.string("idtnr").notNullable().defaultTo("");
    table.string("esfera1").notNullable().defaultTo("");
    table.string("cilindro1").notNullable().defaultTo("");
    table.string("eje1").notNullable().defaultTo("");
    table.string("ojo1").notNullable().defaultTo("");
    table.string("diametro1").notNullable().defaultTo("");
    table.string("adicion1").notNullable().defaultTo("");
    table.string("transparencia1").notNullable().defaultTo("");
    table.string("tipo_armazon1").notNullable().defaultTo("");
    table.string("puente1").notNullable().defaultTo("");
    table.string("vertical1").notNullable().defaultTo("");
    table.string("horizontal1").notNullable().defaultTo("");
    table.string("altura1").notNullable().defaultTo("");
    table.string("dis_naso_pup_cerca1").notNullable().defaultTo("");
    table.string("package1").notNullable().defaultTo("");
    table.string("descentrado1").notNullable().defaultTo("");
    table.string("prisma1").notNullable().defaultTo("");
    table.string("orientacion_prisma1").notNullable().defaultTo("");
    table.string("tenido1").notNullable().defaultTo("");
    table.string("corredor1").notNullable().defaultTo("");
    table.string("esfera2").notNullable().defaultTo("");
    table.string("cilindro2").notNullable().defaultTo("");
    table.string("eje2").notNullable().defaultTo("");
    table.string("ojo2").notNullable().defaultTo("");
    table.string("diametro2").notNullable().defaultTo("");
    table.string("adicion2").notNullable().defaultTo("");
    table.string("transparencia2").notNullable().defaultTo("");
    table.string("tipo_armazon2").notNullable().defaultTo("");
    table.string("puente2").notNullable().defaultTo("");
    table.string("vertical2").notNullable().defaultTo("");
    table.string("horizontal2").notNullable().defaultTo("");
    table.string("altura2").notNullable().defaultTo("");
    table.string("dis_naso_pup_cerca2").notNullable().defaultTo("");
    table.string("package2").notNullable().defaultTo("");
    table.string("descentrado2").notNullable().defaultTo("");
    table.string("prisma2").notNullable().defaultTo("");
    table.string("orientacion_prisma2").notNullable().defaultTo("");
    table.string("tenido2").notNullable().defaultTo("");
    table.string("corredor2").notNullable().defaultTo("");
    table.string("ktext").notNullable().defaultTo("");
  });
}

/* Drop in reverse order */
export async function down(knex: Knex): Promise<void> {
  /* Tables */
  await knex.schema.dropTable(t.xmlGmo);
  await knex.schema.dropTable(t.xmlNow);
  await knex.schema.dropTable(t.xmlTemplate);
  await knex.schema.dropTable(t.xmlContent);
  await knex.schema.dropTable(t.xmlField);
  await knex.schema.dropTable(t.xmlPath);
  await knex.schema.dropTable(t.xmlRegister);
  await knex.schema.dropTable(t.origin);
}
