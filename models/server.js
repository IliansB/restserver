const express = require('express')

var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            usuarios: '/api/usuarios',
            productos: '/api/productos',
        }

        //conectar a bd
        this.conectarDB()

        //middlewares
        this.middlewares();

        //rutas

        this.routes()
    }
    async conectarDB() {
        await dbConnection()
    }

    middlewares() {
        //CORS
        this.app.use(cors())

        //Lectura y parseo del body
        this.app.use(express.json())

        //directorio publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.usuarios, require('../routes/user'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))
        this.app.use(this.paths.productos, require('../routes/productos'))
        this.app.use(this.paths.buscar, require('../routes/buscar'))

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor arriba en puerto ', process.env.PORT)
        })
    }


}


module.exports = Server