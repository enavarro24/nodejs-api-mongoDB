const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config.js');

function createToken(user) {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
    };

    return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken(token) {
    let decoded = new Promise(function (resolve, reject) {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN);

            if (payload.exp <= moment().unix()) {
                resolve({
                    status: 401,
                    message: 'Token Expirado'
                });
            }

            resolve(payload.sub);

        } catch (error) {
            reject({
                status: 500,
                message: 'Token Invalido'
            });
        }
    });

    return decoded;
}

module.exports = {
    createToken,
    decodeToken
};