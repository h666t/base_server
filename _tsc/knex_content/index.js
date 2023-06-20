"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("knex"));
var knexClient;
var initKnexClient = function () {
    knexClient = knex_1.default({
        client: 'sqlite3',
        connection: {
            filename: "./mydb.sqlite"
        }
    });
};
exports.default = {
    knexClient: knexClient,
    initKnexClient: initKnexClient
};
