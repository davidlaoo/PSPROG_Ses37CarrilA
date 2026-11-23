const { Sequelize } = require('sequelize');

module.exports = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE || 'datos.sqlite',
  logging: false
});