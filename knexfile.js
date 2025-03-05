// Update with your config settings.
require('./loadenv');
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'betting_app_dev_db',
      user: 'dev_user',
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 0,
      max: 2,
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
