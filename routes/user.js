const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/user');
const { esRolValido, emailExiste, usuarioExisteById } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.get('/', usuariosGet)


router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(usuarioExisteById),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut)


router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de más de 6 letras').isLength({ min: 6 }),
    check('correo', 'Correo no válido').isEmail(),
    check('correo').custom(emailExiste),
    //check('rol', 'Rol no válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost)


router.delete('/:id',[
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(usuarioExisteById),
    validarCampos
], usuariosDelete)//La variable enviada desde aca, se le llama variable de segmento

router.patch('/', usuariosPatch)


module.exports = router;