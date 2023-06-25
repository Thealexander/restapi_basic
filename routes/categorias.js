const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminR } = require('../middlewares/');
const { CrearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaiD } = require('../helpers/dbValidator');

const router = Router();

//obtener todas las categorias
router.get('/', obtenerCategorias);

//obtener una categoria
router.get('/:id', [
    check('id', 'Id no pertenece a un Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaiD),
    validarCampos
], obtenerCategoria);

//crear una categoria
router.post('/', [
    //validarJWT,
    validarCampos,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
], CrearCategoria);

//actualizar
router.put('/:id', [
    //validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaiD),
    validarCampos
], actualizarCategoria);

//borrar
router.delete('/:id',[
    //validarJWT,
    //esAdminR,
    check('id', 'No es un id de Mongo').isMongoId(),
    validarCampos,
    check('id').custom(existeCategoriaiD),
    validarCampos
], borrarCategoria);


module.exports = router;