/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);

knex.migrate.latest(knexConfig.migrations);

exports.up = function(knex) {
    return knex.schema.createTable('products', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.text('description');
      table.decimal('unit_price');
      table.decimal('unit_weight');
      table.integer('category_id').unsigned();
      table.foreign('category_id').references('categories.id');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('products');
  };