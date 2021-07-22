const { response } = require("express");


const esAdminRole = (req, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: "Se quiere verificar rol si validar token"
        })
    }

    const { rol, nombre } = req.usuario

    if (rol != 'Super Admin') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - no permitido`
        })
    }

    next();
}

const tieneRole = (...roles) => {

    return (req, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: "Se quiere verificar rol si validar token"
            })
        }
        console.log(roles)

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}