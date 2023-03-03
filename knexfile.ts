import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/sqlite3"
    }
  },

  staging: {
    client: "sqlite3",
    connection: {
      filename: "./data/sqlite3"
    }
  },

  production: {
    client: "sqlite3",
    connection: {
      filename: "./data/sqlite3"
    }
  }

};

module.exports = config;
