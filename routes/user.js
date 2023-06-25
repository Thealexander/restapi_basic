const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut,
    usuariosPost, usuariosDelete,
    usuariosPatch } = require('../controllers/user');

//const { validarJWT } = require('../middlewares/validar-jwt');
//const { validarCampos } = require('../middlewares/validaCampos');
//const { esAdminR, tieneRol } = require('../middlewares/validar-roles');
const { validarCampos, validarJWT, esAdminR, tieneRol } = require('../middlewares');


const { RolValido, emailValidator, isUsuarioId } = require('../helpers/dbValidator');

const router = Router();

router.get('/', usuariosGet);
router.put('/:id', [
    check('id', 'No es un Id Valido').isMongoId(),
    check('id').custom(isUsuarioId),
    check('rol').custom(RolValido),
    validarCampos
], usuariosPut);
router.post('/', [
    check('nombre', 'ingrese su nombre').not().isEmpty(),
    check('password', 'contrasena no puede ser vacio').isLength(6),
    check('email', 'correo no valido').isEmail(),
    check('email').custom(emailValidator),
    //check('role', 'rol no valido').isIn(['ADMIN', 'USER']),
    check('rol').custom(RolValido),
    validarCampos
], usuariosPost);
router.delete('/:id', [
    validarJWT,
    esAdminR,
    tieneRol('ADMIN', 'USER'),
    check('id', 'No es un Id Valido').isMongoId(),
    check('id').custom(isUsuarioId),
    validarCampos
], usuariosDelete);
router.patch('/', usuariosPatch);


module.exports = router;