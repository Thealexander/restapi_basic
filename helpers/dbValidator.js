const Role = require('../models/role');
const Usuario = require('../models/user');

const RolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

const emailValidator = async (email = '') => {
    const vMail = await Usuario.findOne({ email });
    if (vMail) {
        throw new Error(`El email ${email} ya esta registrado`);
    }
}

const isUsuarioId = async (id = '') => {
    const isUsuario = await Usuario.findById(id);
    if (!isUsuario) {
        throw new Error(`El id ${id} no existe`);
    }
}
module.exports = {
    RolValido,
    emailValidator,
    isUsuarioId
}