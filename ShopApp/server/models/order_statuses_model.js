const bookshelf = require('./bookshelf.js');

const OrderState = bookshelf.model('OrderState', {
    tableName: 'order_statuses',
    idAttribute: 'order_status_id', 
  
    orders() {
      return this.hasMany('Order', 'order_status_id');
    },
  });
  
  module.exports = OrderState;