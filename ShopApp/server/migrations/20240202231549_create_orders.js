/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('orders', function (table) {
    table.increments('id').primary();
    table.dateTime('approval_date').nullable();
    table.integer('status_id').unsigned().references('id').inTable('order_statuses');
    table.string('username');
    table.string('email');
    table.string('phone_number');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable('orders')
};
