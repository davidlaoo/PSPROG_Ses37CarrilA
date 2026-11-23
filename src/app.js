// General
require("dotenv").config();
const express = require('express');
const cors = require('cors')
const app = express();
const manejadorErrores = require('./middlewares/manejadorErrores')
const logger = require('./middlewares/logger');

const cursoRoute = require('./routes/curso.routes');
const alumnoRoute = require('./routes/alumno.routes');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use('/curso', cursoRoute);
app.use('/alumno', alumnoRoute);

// Middleware de errores
app.use(manejadorErrores)

module.exports = {express, app}