const { response } = require('express');


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
const usuariosPost = (req, res = response) => {
    const { nombre, edad } = req.body;

    res.json({
        msg: 'post API - controller',
        nombre,
        edad
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
