/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);

knex.migrate.latest(knexConfig.migrations);

exports.up = function(knex) {
    return knex.schema.createTable('categories', function(table) {
      table.increments('id').primary();
      table.text('name');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('categories');
  };
