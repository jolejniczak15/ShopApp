const bookshelf = require('./bookshelf.js');

const OrderProduct = bookshelf.model('OrderProduct', {
    tableName: 'orders_products',
    idAttribute: 'orders_products_id', 
  
    order() {
      return this.belongsTo('Order', 'order_id');
    },
  
    product() {
      return this.belongsTo('Product', 'product_id');
    },
  });
  
  module.exports = OrderProduct;