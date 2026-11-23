const { Curso, Alumno, sequelize } = require('../models');
const { Op } = require('sequelize');

async function findCursos() {
    // include es como un JOIN. le decimos que agregue a cada curso
    // un array con los alumnos que tienen el cursoId de dicho curso
    const cursos = await Curso.findAll({include: [{model: Alumno, as: 'alumnos'}]});
    return cursos;
}

async function findCursoByPk(id) {
    const curso = await Curso.findByPk(id, {
        include: [{ 
            model: Alumno, 
            as: 'alumnos' // Must match the alias in your Curso.hasMany association
        }]
    });
    return curso;
}

async function findCursoByNombre(nombre) {
    const curso = await Curso.findAll({where: {nombre: nombre}});
    return curso;
}

async function createCurso(curso) {
    const nuevoCurso = await Curso.create({
        nombre: curso.nombre,
        obligatorio: curso.obligatorio,
        alumnos: curso.alumnos
    }, {
        include: [{ 
            model: Alumno, 
            as: 'alumnos' // Must match the alias in your Curso.hasMany association
        }]
    });

    return nuevoCurso;
}

async function updateCurso(curso, datos) {
    await curso.update({
        nombre: datos.nombre ?? curso.nombre,
        obligatorio: datos.obligatorio ?? curso.obligatorio
    });
}

async function deleteCurso(curso) {
    await curso.destroy();
}

// ---------------------------

async function findAlumnos() {
    const alumnos = await Alumno.findAll();
    return alumnos;
}

async function findAlumnoByPk(id) {
    const alumno = await Alumno.findByPk(id);
    return alumno;
}

async function findAlumnoByNombre(nombre) {
    const alumno = await Alumno.findAll({where: {nombre: nombre}});
    return alumno;
}

async function createAlumno(alumno) {
    const nuevoAlumno = await Alumno.create({
        nombre: alumno.nombre,
        email: alumno.email
    });

    return nuevoAlumno;
}

async function updateAlumno(alumno, datos) {
    await alumno.update({
        nombre: datos.nombre ?? alumno.nombre,
        email: datos.email ?? alumno.email
    });
}

async function deleteAlumno(alumno) {
    await alumno.destroy();
}

// ---------------------------

async function buscarCursos(params) {
    // no me gusta la implementacion
    // que he hecho, pero va

    if (params.nombre || params.obligatorio) {

        if (params.nombre && params.obligatorio) {
            const cursos = await Curso.findAll({where: {
                nombre: params.nombre,
                obligatorio: {
                    [Op.eq]: params.obligatorio.toLowerCase() === 'true'
                } 
            }});

            return cursos;
        }

        else if (params.nombre && params.obligatorio == undefined) {
            const cursos = await Curso.findAll({where: {
                nombre: params.nombre
            }});

            return cursos;
        }

        // podria ser else normal
        else if (params.nombre == undefined && params.obligatorio ) {
            const cursos = await Curso.findAll({where: {
                obligatorio: {
                    [Op.eq]: params.obligatorio.toLowerCase() === 'true'
                }
            }});

            return cursos;
        }
    }
}

async function buscarAlumnos(params) {
    // no me gusta la implementacion
    // que he hecho, pero va

    if (params.texto || params.sinCurso) {

        if (params.texto && params.sinCurso) {
            const cursos = await Alumno.findAll({where: {
                [Op.or]: { 
                    nombre: {[Op.like]: `%${params.texto}%` },
                    email: {[Op.like]: `%${params.texto}%` }
                },
                cursoId: params.sinCurso.toLowerCase() == 'true' ? { [Op.is]: null } : { [Op.not]: null }
            }});

            return cursos;
        }

        else if (params.texto && params.sinCurso == undefined) {
            const cursos = await Alumno.findAll({where: {
                [Op.or]: {
                    nombre: {[Op.like]: `%${params.texto}%` },
                    email: {[Op.like]: `%${params.texto}%` }
                }
            }});

            return cursos;
        }

        // podria ser else normal
        else if (params.texto == undefined && params.sinCurso ) {
            const cursos = await Alumno.findAll({where: {
                cursoId: params.sinCurso.toLowerCase() == 'true' ? { [Op.is]: null } : { [Op.not]: null }
            }});

            return cursos;
        }
    }
}

// ---------------------------

module.exports = {
    findCursos, findCursoByPk, findCursoByNombre, createCurso, updateCurso, deleteCurso,
    findAlumnos, findAlumnoByPk, findAlumnoByNombre, createAlumno, updateAlumno, deleteAlumno,

    buscarCursos, buscarAlumnos
}