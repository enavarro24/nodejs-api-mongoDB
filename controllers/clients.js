const Clients = require('../models/clients.js');

function getClients(request, response) {
    console.log("Obtener todos los clientes");
    Clients.find({}, function (error, clients) {
        if (error) {
            return response.status(500).send({message: "Error al encontrar todos los clientes : " + error});
        }

        response.status(200).send({clients});
    });
}

function getClient(request, response) {
    console.log("buscar cliente");
    let clientID = request.params.clientId;

    Clients.findById(clientID, function (error, client) {
        if (error) {
            return response.status(500).send({message: "Error al encontrar el cliente: " + error});
        }

        if (!client) {
            return response.status(404).send({message: "El cliente con ese ID no existe "});
        }

        response.status(200).send({client});
    });
}

function saveClients(request, response) {
    console.log("Crear Cliente");
    console.log(request.body);

    let clients = new Clients();
    clients.nombreCliente = request.body.nombreCliente;
    clients.clienteId = request.body.clienteId;
    clients.direccion = request.body.direccion;
    clients.email = request.body.email;
    clients.telefono = request.body.telefono;
    clients.cuentas = request.body.cuentas;
    clients.servicios = request.body.servicios;
    clients.categoria = request.body.categoria;

    clients.save(function (error, clientsStored) {
        if (error) {
            response.status(500).send({message: "Error al crear el cliente" + error});
        }

        response.status(200).send({clients: clientsStored});
    });
}


function updateClient(request, response) {
    console.log("Actualizar cliente");

    let clienteID = request.params.clientId;
    let update = request.body;

    Clients.findByIdAndUpdate(clienteID, update, function (error, clientUpdate) {
        if (error) {
            response.status(500).send({message: "Error al actualizar cliente: " + error})
        }
        response.status(200).send({client: clientUpdate});
    });
}

function deleteClient(request, response) {
    console.log("Eliminar cliente");
    let clientID = request.params.clientId;

    Clients.findById(clientID, function (error, clients) {
        if (error) {
            response.status(500).send({message: "Error al buscar cliente: " + error});
        }

        clients.remove(function (error) {
            if (error) {
                response.status(500).send({message: "Error al borrar cliente: " + error});
            }
            response.status(200).send({message: "El cliente ha sido eliminado con exito"});

        })
    })
}

module.exports = {
    getClients,
    getClient,
    updateClient,
    deleteClient,
    saveClients
};