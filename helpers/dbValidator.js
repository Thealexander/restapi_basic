const Role = require('../models/role');
const { Usuario, Categoria, Producto } = require('../models');
//const Categoria = require('../models/categoria');

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

const existeCategoriaiD = async (id) => {
    const isCategoria = await Categoria.findById(id);
    if (!isCategoria) {
        throw new Error(`El id ${id} no existe`);
    }
}


const existeProductoiD = async (id) => {
    const isProducto = await Producto.findById(id);
    if (!isProducto) {
        throw new Error(`El id ${id} no existe`);
    }
}
const coleccionesPermitadas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);

    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitido, ${colecciones}`);
    }
    return true;
}


module.exports = {
    RolValido,
    emailValidator,
    isUsuarioId,
    existeCategoriaiD,
    existeProductoiD,
    coleccionesPermitadas
}