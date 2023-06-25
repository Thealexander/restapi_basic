const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/cn');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3001;
        this.path = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            usuarios: '/api/usuarios',
            productos: '/api/productos'
        }
        //  this.usuarioPath = '/api/usuarios';
        //  this.authPath = '/api/auth';

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
        this.app.use(this.path.auth, require('../routes/auth'));
        this.app.use(this.path.buscar, require('../routes/buscar'));
        this.app.use(this.path.categorias, require('../routes/categorias'));
        this.app.use(this.path.productos, require('../routes/productos'));
        this.app.use(this.path.usuarios, require('../routes/user'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;

