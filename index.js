const { express, app } = require('./src/app.js');
const { sequelize } = require('./src/models');

async function inicializarApi() {
    try {
        // autenticarse en la BBDD sqlite
        await sequelize.authenticate();

        // crear las tablas necesarias en la BBDD
        await sequelize.sync();

        // si nada ha fallado, iniciamos la API express
        app.listen(process.env.PORT, () => {
            console.log(`Escuchando en :${process.env.PORT}`);
        });
    } catch (error) {
        console.error(`Error al conectar a la BBDD: ${error}`);
    }
}

inicializarApi();