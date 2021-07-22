const { response } = require("express")
const bcryptjs = require('bcryptjs')

const Usuario = require("../models/usuario")

const usuariosGet = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;

    //Promise.all hace que se ejecuten todas las promesas de forma simultanea
    //y el await hace que se responda cuando todas hayan finalizado
    //Si una da error, todas dan el error.
    //se aplica desestructuración de arreglos para dar un formato a la respuesta
    //separando el total de usuarios
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(),
        Usuario.find()
            .skip(Number(desde))
            .limit(Number(limite))

    ])
    res.json({
        total, usuarios
    })
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, rol, password } = req.body
    const usuario = new Usuario({ nombre, correo, rol, password });

    //encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    await usuario.save();
    res.json({
        msg: "post api - controlador",
        usuario
    })
}

const usuariosPut = async (req, res = response) => {
    const id = req.params.id;
    const { password, google, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json(usuario);
}

const usuariosDelete = async(req, res = response) => {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndDelete(id);
    res.json({
        id,
        usuario
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: "patch api - controlador"
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}