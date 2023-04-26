const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/user');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validaCampos');
const { RolValido } = require('../helpers/dbValidator');

const router = Router();

router.get('/', usuariosGet);
router.put('/:id', usuariosPut);
router.post('/', [
    check('nombre', 'ingrese su nombre').not().isEmpty(),
    check('password', 'contrasena no puede ser vacio').isLength(6),
    check('email', 'correo no valido').isEmail(),
    //check('role', 'rol no valido').isIn(['ADMIN', 'USER']),
    check('rol').custom(RolValido),
    validarCampos
], usuariosPost);
router.delete('/', usuariosDelete);
router.patch('/', usuariosPatch);



module.exports = router;