import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('users', function (table) {
            table.increments('id');
            table.string('name', 255).notNullable();
            table.string('password', 255).notNullable();
            table.timestamps(true, true);
            table.boolean("is_removed");
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable("users");
}

