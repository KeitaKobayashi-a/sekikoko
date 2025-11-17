/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('seats', (table) => {
    table.increments('id').primary();
    table.integer('loc');
    table.integer('ticket_number');
    table.boolean('is_seated').notNullable();
  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable('seats');
};
