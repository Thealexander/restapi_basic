const express = require('express')
const cors = require('cors');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios';

        //Middlewares
        this.middlewares();

        //routes
        this.routes();
    }
    middlewares() {
        //cors
        this.app.use(cors());

        //R Parse body
        this.app.use(express.json());

        //Dir Public
        this.app.use(express.static('public'));
    }
    routes() {
        this.app.use(this.usuarioPath, require('../routes/user'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;

