const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Alumno = sequelize.define('Alumno', {
  nombre: DataTypes.STRING,
  email: DataTypes.STRING
});

module.exports = Alumno;