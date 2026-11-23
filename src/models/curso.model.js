const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Curso = sequelize.define('Curso', {
  nombre: DataTypes.STRING,
  obligatorio: DataTypes.BOOLEAN
});

module.exports = Curso;