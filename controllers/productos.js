const { response, request } = require("express")
const { Producto } = require('../models')

const crearProducto = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const { precio, categoria, descripcion } = req.body
    const productoDB = await Producto.findOne({ nombre });

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        })
    }

    //Genera data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id,
        precio,
        categoria,
        descripcion
    }

    const producto = new Producto(data)
    //Guardar DB
    await producto.save()
    res.status(201).json(producto)
}


//obtenerProductos - paginado - total - populate
const obtenerProductos = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).populate('usuario', 'nombre').populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.status(200).json({
        total, productos
    })

}


// //obtenerProducto - populate

const obtenerProducto = async (req = request, res = response) => {
    const { id } = req.params;

    const producto = await Producto.findById(id).populate('usuario', 'nombre').populate('categoria', 'nombre')

    res.status(200).json({
        producto
    })
}



//actualizarProducto
const actualizarProducto = async (req, res = response) => {
    const id = req.params.id;
    const { estado, ...resto } = req.body;

    if (!resto) {
        return res.status(400).json({
            msg: "Ingrese los datos a modificar"
        })
    }
    const producto = await Producto.findByIdAndUpdate(id, resto, { new: true })

    res.json(producto);
}



//borrarProducto - estado:false
const borrarProducto = async (req, res = response) => {
    const id = req.params.id;
    const producto = await Producto.findByIdAndUpdate(id, { "estado": false })

    return res.json(producto);
}


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}