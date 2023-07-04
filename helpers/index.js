const dbValidator = require('./dbValidator');
const generarJwt = require('./generar-jwt');
const googleHelper = require('./googleHelper');
const subirArchivo = require('./subir-archivo');

module.exports = {
    ...dbValidator,
    ...generarJwt,
    ...googleHelper,
    ...subirArchivo
}