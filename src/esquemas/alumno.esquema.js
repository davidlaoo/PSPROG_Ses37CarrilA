const z = require('zod');

const esquemaAlumno = z.object({
    nombre: z.string().trim().optional(),
    email: z.email().optional(),
    idCurso: z.number().optional()
});

module.exports = esquemaAlumno;