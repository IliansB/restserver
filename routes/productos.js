const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { productoExiste, productoExisteById } = require('../helpers/db-validators');
const { validarJWT, validarCampos, tieneRole } = require('../middlewares');



const router = Router();

//Obtener todos los producto - Publico
router.get('/', obtenerProductos)

//Obtener un producto - Publico
router.get('/one/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(productoExisteById),
    validarCampos
], obtenerProducto)

//Crear producto - privado
router.post('/', [
    validarJWT,
    check('categoria', 'No es un id válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoría es obligatoria').not().isEmpty(),
    check('nombre').custom(productoExiste),
    validarCampos
], crearProducto)

//actualizar producto - privado
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(productoExisteById),
    validarCampos
], actualizarProducto)

//Borrar producto - privado - Admin
router.delete('/:id', [
    validarJWT,
    tieneRole('Super Admin'),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(productoExisteById),
    validarCampos
], borrarProducto)

module.exports = router;