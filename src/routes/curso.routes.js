const express = require('express');
const router = express.Router();
const validar = require('../middlewares/validar')
const ErrorHTTP = require('../middlewares/ErrorHTTP')
const esquemaCurso = require('../esquemas/curso.esquema');
const esquemaBusquedaCurso = require('../esquemas/busquedacurso.esquema');
const {findCursos, findCursoByPk, createCurso, updateCurso, deleteCurso, findCursoByNombre, buscarCursos} = require('./ServicioEscuela');
const { Curso, Alumno } = require('../models');

// Al inicio por orden de busqueda de ruta
router.get('/buscar', validar(esquemaBusquedaCurso), async (req, res) => {
    const cursos = await buscarCursos(req.query);

    if (cursos.length > 0) {
        res.json(cursos);
    } else throw new ErrorHTTP(404, "No existen cursos que cumplan esa busqueda");
});

// CRUD normal
router.get('/', async (req, res) => {
    const cursos = await findCursos();
    res.json(cursos);
});

router.get('/:id', async (req, res, next) => {
    try {
        const existe = await findCursoByPk(req.params.id);
        if (existe) {
            res.json(existe);
        } else throw new ErrorHTTP(404, "No existe ese curso"); //res.status(404).json({ error: "No existe ese curso"});   
    } catch (error) {
        next(error);
    }
});

router.post('/', validar(esquemaCurso), async (req, res, next) => {
    try {
        const existeCurso = await findCursoByNombre(req.body.nombre);

        if (existeCurso.length > 0) {
            throw new ErrorHTTP(403, "Ya existe ese curso")
        } else {
            const nuevoCurso = await createCurso(req.body);
            res.status(200).json(nuevoCurso);
        }
    } catch (error) {
        next(error);
    }
});

router.put('/:id', validar(esquemaCurso), async (req, res, next) => {
    try {
        const curso = await findCursoByPk(req.params.id);

        if (curso) {
            await updateCurso(curso, req.body);
            res.status(204).json({ message: "Actualizado con exito" });
        } else throw new ErrorHTTP(404, "No existe ese curso"); //res.status(404).json({ error: "No existe ese curso"});
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res) => {
    const curso = await findCursoByPk(req.params.id);

    if (curso) {
        await deleteCurso(curso);
        res.status(200).json({ message: "Curso borrado" })
    } else throw new ErrorHTTP(404, "No existe ese curso");
});


// ----------------------
// Rutas adicionales
// ----------------------
router.get('/:id/alumnos', async (req, res) => {
    const curso = await findCursoByPk(req.params.id);

    if (curso) {
        res.status(200).json(curso.alumnos);
    } else throw new ErrorHTTP(404, "No existe ese curso");
})

module.exports = router;