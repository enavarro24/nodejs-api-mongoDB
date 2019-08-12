const mongoose = require('mongoose');
const User = require('../models/users.js');
const service = require('../service/index.js');

function signUp(request, response) {
    const user = new User({
        email: request.body.email,
        name: request.body.name,
        password: request.body.password
    });
    user.save(function (error) {
        if (error) {
            response.status(500).send({message: "Error al crear Usuario! " + error});
        }
        return response.status(201).send({token: service.createToken(user)});
    });

}

function signIn(request, response) {
    User.find({email: request.body.email}, function (error, user) {
        if (error) {
            return response.status(500).send({message: "Error: " + error});
        }
        if (!user) {
            return response.status(404).send({message: "No se encontro el Usuario"});
        }

        request.user = user;
        response.status(200).send({
            message: "Te has logueado correctamente",
            token: service.createToken(user)
        });

    })
}

module.exports = {
    signUp,
    signIn
};