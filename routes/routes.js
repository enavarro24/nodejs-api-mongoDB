const express = require('express');
const api = express.Router();
const ClientsController = require('../controllers/clients.js');
const auth = require('../middleware/auth.js');
const UserController = require('../controllers/user.js');

// Rutas para los clientes
// Obtener todos los clientes
api.get('/clients', ClientsController.getClients);

// Obtener cliente con ID en especifico
api.get('/clients/:clientId', ClientsController.getClient);

// Crear Clientes
api.post('/clients',auth, ClientsController.saveClients);

// Actualizar cliente en especifico
api.put('/clients/:clientId',auth, ClientsController.updateClient);

// Eliminar cliente en especifico
api.delete('/clients/:clientId',auth, ClientsController.deleteClient);

api.get('/private', auth, function (request, response) {
    response.status(200).send({message : "Tienes acceso" })
});

// Rutas para usuarios
api.post('/signUp', UserController.signUp);
api.post('/signIn', UserController.signIn);

module.exports = api ;