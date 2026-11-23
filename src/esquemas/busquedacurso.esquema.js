const z = require('zod');

const esquemaBusquedaCurso = z.object({
    nombre: z.string().trim(),
    obligatorio: z.boolean().optional()
});

module.exports = esquemaBusquedaCurso;