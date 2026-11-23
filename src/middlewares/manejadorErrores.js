manejadorErrores = (err, req, res, next) => {
    if (err.status)
        res.status(err.status).json({ message: err.message });
    else
        res.status(500).json({ message: err.message });

    // console.error(err.stack);
    // res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' });
}

module.exports = manejadorErrores