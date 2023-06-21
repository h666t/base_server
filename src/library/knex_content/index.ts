import knex, { Knex } from "knex";

let knexClient: Knex;

const getKnex = () => {
  if(!knexClient){
    knexClient = knex({
      client: 'sqlite3', // or 'better-sqlite3'
      connection: {
        filename: "./data/sqlite3"
      }
    });
  }
  return knexClient;
}

export default {getKnex}