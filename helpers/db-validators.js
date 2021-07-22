const Roles = require("../models/roles")
const Usuario = require("../models/usuario")


const esRolValido = async (rol = '') => {
    const existeRol = await Roles.findOne({ rol })
    if (!existeRol) {
        throw new Error('Rol no válido')
    }
}

const emailExiste = async (correo) => {

    //verifica si existe correo
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error('Correo ya existe')
    }

}

const usuarioExisteById = async (id) => {

    //verifica si existe usuario id
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error('Id Usuario no existe')
    }

}

module.exports = {
    esRolValido,
    emailExiste,
    usuarioExisteById
}