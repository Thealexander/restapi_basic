const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/user');

const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/googleHelper');

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
const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {
        // const googleUser = await googleVerify(id_token);
        const { nombre, img, correo } = await googleVerify(id_token);
        // console.log(googleUser)
        let usuario = await Usuario.findOne({ correo });
        //Crear usuario
        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            };
            usuario = new Usuario(data);
            await usuario.save();
        }
        //Si el usuario esta en la DB
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Contacte al Administrador - Usr bloqueado'
            });
        }
        //generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'Todo bien',
            //  id_token
            usuario,
            token
        });
    } catch (error) {
        json.status(400).json({
            ok: false,
            msg: 'El Token no se puede verificar'
        })
    }

}
module.exports = {
    login,
    googleSignIn
}