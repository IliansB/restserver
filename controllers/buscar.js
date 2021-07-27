const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const { productoExisteById } = require("../helpers/db-validators");
const { Usuario, Producto, Categoria } = require("../models");
const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async (termino = '', res = response) => {
    const esMongoID = isValidObjectId(termino);//true
    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: usuario ? [usuario] : []
        })
    }

    const regex = new RegExp(termino, 'i')//Hace que la búsqueda sea insensible
    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });
    return res.json({
        results: usuarios
    })
}

const buscarCategorias = async (termino = '', res = response) => {
    const esMongoID = isValidObjectId(termino);//true
    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: categoria ? [categoria] : []
        })
    }

    const regex = new RegExp(termino, 'i')//Hace que la búsqueda sea insensible
    const categoria = await Categoria.find({ nombre: regex });
    return res.json({
        results: categoria
    })
}

const buscarProductos = async (termino = '', res = response) => {
    const esMongoID = isValidObjectId(termino);//true
    if (esMongoID) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');
        return res.json({
            results: producto ? [producto] : []
        })
    }
    const regex = new RegExp(termino, 'i')//Hace que la búsqueda sea insensible
    const producto = await Producto.find({ nombre: regex }).populate('categoria', 'nombre');
    return res.json({
        results: producto
    })
}



const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res)

            break;
        case 'categorias':
            buscarCategorias(termino, res)
            break;
        case 'productos':
            buscarProductos(termino, res)
            break;

        default:
            res.status(500).json({
                msg: "Olvidé hacer esta búsqueda"
            })
            break;
    }

    // res.status(200).json({
    //     coleccion,
    //     termino
    // })

}

module.exports = {
    buscar
}