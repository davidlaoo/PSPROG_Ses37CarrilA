const sequelize = require('../config/database');
const Alumno = require('./alumno.model');
const Curso = require('./curso.model');

// Un curso tiene muchos alumnos
Curso.hasMany(Alumno, { foreignKey: 'cursoId', as: 'alumnos'});

// Un alumno pertenece a un solo curso
Alumno.belongsTo(Curso, { foreignKey: 'cursoId', as: 'curso'});

module.exports = {sequelize, Curso, Alumno};