import knex from "knex";
let knexClient;

// const initKnex = () => {
//     knexClient = knex({
//       client: 'sqlite3', // or 'better-sqlite3'
//       connection: {
//         filename: "../../../data/sqlite3.sqlite"
//       }
//     });
// };

const getKnex = () => {
  return knex({
    client: 'sqlite3', // or 'better-sqlite3'
    connection: {
      filename: "./data/sqlite3"
    }
  })
}

 

export default {knexClient, getKnex}