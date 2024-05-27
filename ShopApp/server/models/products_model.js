const bookshelf = require('./bookshelf.js');

const Product = bookshelf.model('Product', {
    tableName: 'products',
    idAttribute: 'product_id',
    category() {
        return this.belongsTo('Category', 'category_id');
      },
    
      orderProducts() {
        return this.hasMany('OrderProduct', 'order_id');
      },
})

module.exports = Product;