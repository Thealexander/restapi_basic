const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/user');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        //email
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                msg: 'User/Pass incorrectos - email'
            });
        }
        //activo
        if (!usuario.status) {
            return res.status(400).json({
                msg: 'User/Pass incorrectos - estado'
            });
        }
        //pass
        const ValidPass = bcryptjs.compareSync(password, usuario.password);
        if (!ValidPass) {
            return res.status(400).json({
                msg: 'User/Pass incorrectos - password'
            });
        }
        //jwt
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el Admin'
        })
    }

}

module.exports = {
    login
}