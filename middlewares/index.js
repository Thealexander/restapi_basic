const validarCampo = require('../middlewares/validaCampos');
const validarJWT = require('../middlewares/validar-jwt');
const validaRol = require('../middlewares/validar-roles');

module.exports = {
    ...validarCampo,
    ...validarJWT,
    ...validaRol
}