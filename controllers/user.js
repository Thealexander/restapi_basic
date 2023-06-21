const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/user');

const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    //const { q, nombre, apikey, page, limit } = req.query;

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        //  msg: 'get API - controller',
        total,
        usuarios
    });
}
const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;
    //password
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put API - controller',
        //id,
        usuario
    });
}
const usuariosPost = async (req, res = response) => {

    const { nombre, email, password, rol } = req.body;
    const usuario = new Usuario({ nombre, email, password, rol });


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
const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;
    //physical
    //**   const usuario = await Usuario.findByIdAndDelete(id); */
    //virtual 
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    const usrAutenticado = req.usuario;
    res.json(
        usuario
    );
}
const usuariosPatch = (req, res = response) => {

    const { id } = req.params;

    res.json({
        id
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}
