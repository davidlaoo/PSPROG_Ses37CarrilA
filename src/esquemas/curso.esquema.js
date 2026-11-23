const z = require('zod');
const esquemaAlumno = require('../esquemas/alumno.esquema');

const esquemaCurso = z.object({
    nombre: z.string().trim(),
    obligatorio: z.boolean().optional(),
    alumnos: z.array(esquemaAlumno).optional()
});

module.exports = esquemaCurso;