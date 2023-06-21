const { Router } = require('express');                                                                                     
const { check } = require('express-validator');
const { login } = require('../controllers/auth');

const { validarCampos } = require('../middlewares/validaCampos');

const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contrasena es necesaria').not().isEmpty(),
    validarCampos
], login);




module.exports = router;