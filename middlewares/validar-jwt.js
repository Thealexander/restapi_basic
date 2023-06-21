const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/user');

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(400).json({
            msg: "No existe token en la peticion"
        });
    }
    //console.log(token);
    try {

        const { uid } = jwt.verify(token, process.env.SECRET0RPRIVATEKEY);
        //leer usuario autenticado
        const usuario = await Usuario.findById(uid);

        req.uid = usuario;

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - user borrado db'
            })
        }

        //  req.uid = uid;
        //console.log(payload);
        //verificar uid
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - user con estado : false'
            })
        }
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}


module.exports = {
    validarJWT
}