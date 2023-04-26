const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/cn');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3001;
        this.usuarioPath = '/api/usuarios';

        //Databases CN
        this.cn();

        //Middlewares
        this.middlewares();

        //routes
        this.routes();
    }
    async cn() {
        await dbConnection();
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

