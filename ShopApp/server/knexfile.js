module.exports = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'shop_app',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
  },
};

