const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_CN,
            // En la revision de la documentacion ya esto no es necesario en la version 7de moongose{
            // useNewUrlParser: true,
            //useUnifiedTopology: true,
            //   useCreateIndex: true,
            //   useFindAndModify: false
            // }
            // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
        );
        console.log('Conexion exitosa');
    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar la conexion');
    }
}


module.exports = {
    dbConnection
}