const z = require('zod');

const esquemaBusquedaAlumno = z.object({
    texto: z.string().trim().optional(),
    sinCurso: z.boolean().optional()
});

module.exports = esquemaBusquedaAlumno;