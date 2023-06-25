const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validaCampos');
const { login, googleSignIn } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contrasena es necesaria').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'id_token es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);





module.exports = router;