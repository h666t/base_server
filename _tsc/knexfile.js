"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Update with your config settings.
var config = {
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
