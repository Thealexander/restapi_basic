const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/user');

const usuariosGet = (req, res = response) => {

    const { q, nombre, apikey, page, limit } = req.query;
    res.json({
        msg: 'get API - controller',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}
const usuariosPut = (req, res = response) => {

    const id = req.params.id;
    res.json({
        msg: 'put API - controller',
        id
    });
}
const usuariosPost = async (req, res = response) => {

    const { nombre, email, password, rol } = req.body;
    const usuario = new Usuario({ nombre, email, password, rol });

    //Verificar email
    const vMail = await Usuario.findOne({ email });
    if (vMail) {
        return res.status(400).json({
            msg: 'Este correo ya cuenta con registro'
        });
    }

    //encriptacion
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar db
    await usuario.save();
    res.json({
        msg: 'post API - controller',
        usuario
    });
}
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'Delete API - controller'
    });
}
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - controller'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}
