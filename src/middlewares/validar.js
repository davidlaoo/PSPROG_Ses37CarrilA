function validar(esquema) { // Envolvemos
  return (req, res, next) => { // Hacemos que actue como middleware
    const resultado = esquema.safeParse(req.body); // Usamos la funcionalidad de zod
    if (!resultado.success) {
      return res.status(400).json({ errores: resultado.error.issues.map(i => i.message) });
    }
    req.body = resultado.data;
    next();
  };
}
module.exports = validar;