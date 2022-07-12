/* env */
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

/* Knex credentials */
const knexfile = {
  client: "pg",
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};

export default knexfile;
