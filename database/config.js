const mongoose = require('mongoose')

const dbConnection = async()=>{

try {

    await mongoose.connect(process.env.MONGODB_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        dbName: process.env.DB_NAME
    })
    
    console.log('Bd conectada')
} catch (error) {
    throw new Error('Error al iniciar bd ', error)
}

}


module.exports = {
    dbConnection
}