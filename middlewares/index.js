const validarCampo = require('../middlewares/validaCampos');
const validarJWT = require('../middlewares/validar-jwt');
const validaRol = require('../middlewares/validar-roles');
const validarArchivos = require('../middlewares/validar-archivo');

module.exports = {
    ...validarCampo,
    ...validarJWT,
    ...validaRol,
    ...validarArchivos
}