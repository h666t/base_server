"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("knex"));
var knexClient;
// const initKnex = () => {
//     knexClient = knex({
//       client: 'sqlite3', // or 'better-sqlite3'
//       connection: {
//         filename: "../../../data/sqlite3.sqlite"
//       }
//     });
// };
var getKnex = function () {
    return knex_1.default({
        client: 'sqlite3',
        connection: {
            filename: "./data/sqlite3"
        }
    });
};
exports.default = { knexClient: knexClient, getKnex: getKnex };
