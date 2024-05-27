/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('orders_products', function (table) {
        table.increments('id').primary();
        table.integer('order_id').unsigned().references('id').inTable('orders');
        table.integer('product_id').unsigned().references('id').inTable('products');
        table.integer('quantity').unsigned().notNullable();
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    dropTable('orders_products')
};
