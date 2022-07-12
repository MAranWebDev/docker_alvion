import knex from "knex";
import knexfile from "./knexfile";

/* Knex connection */
const connection = knex(knexfile);

export default connection;
