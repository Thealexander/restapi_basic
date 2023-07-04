const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarArchivos } = require('../middlewares');
const { cargarArchivo, actImagen, mostrarImgen } = require('../controllers/uploads');
const { coleccionesPermitadas } = require('../helpers');

const router = Router();

router.post('/', validarArchivos, cargarArchivo)

router.put('/:coleccion/:id', [
    validarArchivos,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitadas(c, ['usuarios', 'productos'])),
    validarCampos
], actImagen)

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitadas(c, ['usuarios', 'productos'])),
    validarCampos
],mostrarImgen )




module.exports = router;