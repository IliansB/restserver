const { response, request } = require("express")

const jwt = require('jsonwebtoken')

const Usuario = require("../models/usuario")

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');
    console.log(token)
    if (!token) {
        res.status(401).json({
            msg: "Token no proporcionado"
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        const usuario = await Usuario.findById(uid)

        if(!usuario){
            return res.status(401).json({
                msg: "Usuario no existe en bd"
            })
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: "Usuario con estado false"
            })
        }
        req.usuario = usuario;

        next();

    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: "Token no válido"
        })
    }

}


module.exports = {
    validarJWT
}