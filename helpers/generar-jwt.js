const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRET0RPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log();
                reject('token no puede ser generado');
            } else {
                resolve(token);
            }
        });

    })
}

module.exports = {
    generarJWT
}