const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { categoriaExisteById } = require('../helpers/db-validators');
const { validarJWT, validarCampos, tieneRole } = require('../middlewares');



const router = Router();

//Obtener todas las categorías - Publico
router.get('/', obtenerCategorias)

//Obtener una categoría - Publico
router.get('/one/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(categoriaExisteById),
    validarCampos
], obtenerCategoria)

//Crear categorías - privado
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)

//actualizar categorías - privado
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(categoriaExisteById),
], actualizarCategoria)

//Borrar categorías - privado - Admin
router.delete('/:id', [
    validarJWT,
    tieneRole('Super Admin'),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(categoriaExisteById),
], borrarCategoria)

module.exports = router;