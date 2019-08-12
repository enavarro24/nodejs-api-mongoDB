const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = Schema({
    nombreCliente: String,
    clienteId: String,
    direccion: String,
    email: String,
    telefono: String,
    cuentas: {type: String, enum: ['creditos', 'debitos', 'ahorros']},
    servicios: {type: String, enum: ['seguros', 'solicitud creditos', 'solicitud ahorro', 'solicitud tarjetas']},
    categoria: {type: String, enum: ['premium', 'platinum', 'moroso']}

});

module.exports = mongoose.model('Clients', ClientSchema);