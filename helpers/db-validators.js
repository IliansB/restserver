const { Categoria } = require("../models")
const Roles = require("../models/roles")
const Usuario = require("../models/usuario")
const Producto = require("../models/producto")


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

const categoriaExisteById = async (id) => {

    //verifica si existe categoría id
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error('Id Categoría no existe')
    }
}

const productoExisteById = async (id) => {

    //verifica si existe producto id
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error('Id Producto no existe')
    }
}

const productoExiste = async (producto) => {

    //verifica si existe producto
    const existeProducto = await Producto.findOne({ producto });
    if (existeProducto) {
        throw new Error('Producto ya existe')
    }

}

module.exports = {
    esRolValido,
    emailExiste,
    usuarioExisteById,
    categoriaExisteById,
    productoExiste,
    productoExisteById
}