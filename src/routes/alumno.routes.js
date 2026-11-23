const express = require('express');
const router = express.Router();
const z = require('zod');
const validar = require('../middlewares/validar');
const ErrorHTTP = require('../middlewares/ErrorHTTP');
const esquemaAlumno = require('../esquemas/alumno.esquema');
const esquemaBusquedaAlumno = require('../esquemas/busquedaalumno.esquema');
const { Curso, Alumno } = require('../models');
const {findAlumnos, findAlumnoByPk, createAlumno, updateAlumno, deleteAlumno, findAlumnoByNombre, findCursoByPk, buscarAlumnos} = require('./ServicioEscuela');

// Al inicio por orden de busqueda de ruta
router.get('/buscar', validar(esquemaBusquedaAlumno), async (req, res) => {
    const alumnos = await buscarAlumnos(req.query);

    if (alumnos.length > 0) {
        res.json(alumnos);
    } else throw new ErrorHTTP(404, "No existen alumnos que cumplan esa busqueda");
});

// CRUD normal
router.get('/', async (req, res) => {
    const alumnos = await findAlumnos();
    res.json(alumnos);
});

router.get('/:id', async (req, res, next) => {
    try {
        const alumnoEsperado = await findAlumnoByPk(req.params.id);

        if (alumnoEsperado) {
            res.json(alumnoEsperado);
        } else throw new ErrorHTTP(404, "No existe ese alumno"); //res.status(404).json({ error: "No existe ese alumno"});   
    } catch (error) {
        next(error);
    }
});

router.post('/', validar(esquemaAlumno), async (req, res, next) => {
    try {
        const alumnoEsperado = await findAlumnoByNombre(req.body.nombre);

        if (alumnoEsperado.length > 0) {
            throw new ErrorHTTP(403, "Ya existe ese alumno"); //res.status(403).json({ message: "Ya existe ese alumno" });
        } else {
            const nuevoAlumno = await createAlumno(req.body);
            res.status(200).json(nuevoAlumno);
        }
    } catch (error) {
        next(error);
    }
});

router.put('/:id', validar(esquemaAlumno), async (req, res, next) => {
    try {
        const alumnoEsperado = await findAlumnoByPk(req.params.id);

        if (alumnoEsperado) {
            await updateAlumno(alumnoEsperado, req.body);
            res.status(204).json({ message: "Actualizado con exito" });
        } else throw new ErrorHTTP(404, "No existe ese alumno"); //res.status(404).json({ error: "No existe ese alumno"});   
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const alumnoEsperado = await findAlumnoByPk(req.params.id);

        if (alumnoEsperado) {
            await deleteAlumno(alumnoEsperado);
            res.status(200).json({ message: "Alumno borrado" })
        } else throw new ErrorHTTP(404, "No existe ese alumno"); //res.status(404).json({ error: "No existe ese alumno"});
    } catch (error) {
        next(error);
    }
});
// ----------------------
// Rutas adicionales
// ----------------------
router.get('/:id/curso', async (req, res) => {
    const alumno = await findAlumnoByPk(req.params.id);
    const curso = await findCursoByPk(alumno.cursoId);

    if (curso) {
        res.status(200).json(curso);
    } else throw new ErrorHTTP(404, "No existe ese curso");
})

module.exports = router;