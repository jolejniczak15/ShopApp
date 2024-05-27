const bookshelf = require('./bookshelf.js');
const knex = bookshelf.knex;

const Order = bookshelf.model('Order', {
  tableName: 'orders',
  idAttribute: 'order_id',
  status() {
    return this.belongsTo('OrderState', 'order_status_id');
  },

  orderProducts() {
    return this.hasMany('OrderProduct', 'order_id');
  },
})

module.exports = Order;