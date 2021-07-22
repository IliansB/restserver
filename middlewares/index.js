const validaJWT = require('../middlewares/validar-jwt');
const validaCampos = require('../middlewares/validar-campos');
const validaRoles = require('../middlewares/validar-roles');

module.exports = {
    ...validaJWT,
    ...validaCampos,
    ...validaRoles
}