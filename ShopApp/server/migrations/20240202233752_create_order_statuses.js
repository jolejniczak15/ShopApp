/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('order_statuses', function (table) {
        table.increments('id').primary();
        table.string('name');
      })
      .then(() => {
        return knex('order_statuses').insert([
          { name: 'NOT_APPROVED' },
          { name: 'APPROVED' },
          { name: 'CANCELLED' },
          { name: 'COMPLETED' },
        ]);
      });
    };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
