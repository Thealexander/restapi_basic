const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminR } = require('../middlewares');
const { CrearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto } = require('../controllers/products');
const { existeProductoiD, existeCategoriaiD } = require('../helpers/dbValidator');

const router = Router();

//obtener todas las existeProductoiDs
router.get('/', obtenerProductos);

//obtener una existeProductoiD
router.get('/:id', [
    check('id', 'Id no pertenece a un Mongo valido').isMongoId(),
    check('id').custom(existeProductoiD),
    validarCampos
], obtenerProducto);

//crear una producto
router.post('/', [
    //validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaiD),
    validarCampos,
], CrearProducto);

//actualizar
router.put('/:id', [
    //validarJWT,
    //check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   // check('id', 'No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoiD),
    validarCampos
], actualizarProducto);

//borrar
router.delete('/:id', [
    //validarJWT,
    //esAdminR,
    check('id', 'No es un id de Mongo').isMongoId(),
    validarCampos,
    check('id').custom(existeProductoiD),
    validarCampos
], borrarProducto);


module.exports = router;