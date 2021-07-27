const { response, request } = require("express")
const { Categoria } = require('../models')

const crearCategoria = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        })
    }

    //Genera data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data)

    //Guardar DB
    await categoria.save()


    res.status(201).json(categoria)
}


//obtenerCategorias - paginado - total - populate
const obtenerCategorias = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    //const populate = {path: 'usuarios', select: 'PERSONAL_DATA.NAME PERSONAL_DATA.LASTNAME'}
    const query = { estado: true }
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query).populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.status(200).json({
        total, categorias
    })

}


//obtenerCategoria - populate

const obtenerCategoria = async (req = request, res = response) => {
    const { id } = req.params;

    const categoria = await Categoria.findById(id).populate('usuario', 'nombre')

    res.status(200).json({
        categoria
    })
}



//actualizarCategoria
const actualizarCategoria = async (req, res = response) => {
    const id = req.params.id;
    const { nombre } = req.body;

    if (!nombre) {
       return res.status(400).json({
            msg: "Debe ingresar el nuevo nombre de categoría"
        })
    }
    nombre = nombre.toUpperCase();
    const categoria = await Categoria.findByIdAndUpdate(id, { nombre })

    res.json(categoria);
}



//borrarCategoria - estado:false
const borrarCategoria = async (req, res = response) => {
    const id = req.params.id;
    const categoria = await Categoria.findByIdAndUpdate(id, { "estado": false })

    return res.json(categoria);
}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}