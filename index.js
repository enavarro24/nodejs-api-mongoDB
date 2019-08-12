const mongoose = require('mongoose');
const app = require('./app.js');
const config = require('./config.js');

mongoose.connect(config.db, function (error, response) {
    if (error) {
        return console.log("Error al conectar a la base de datos: " + error);
    }

    console.log("Conexion Exitosa");
    app.listen(config.port, function (request, response) {
        console.log("Api rest express in port: ", config.port);
    });

});

