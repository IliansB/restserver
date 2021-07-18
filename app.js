//orden declaraciones
//1 librerias propias de node (ejemplo fs)
//2 librerias de terceros
//3 declaraciones propias de clases propias

require('dotenv').config()

const Server = require('./models/server')

const server = new Server();

server.listen();



