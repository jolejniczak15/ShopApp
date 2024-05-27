const bookshelf = require('./bookshelf.js');

const Category = bookshelf.model('Category',{
    tableName: "categories",
    idAttribute: 'category_id',
    products() {
        return this.hasMany('Product', 'category_id');
      }
});

module.exports = Category;
