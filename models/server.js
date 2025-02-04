const express = require('express');
const cors = require('cors');

// Importar rutas
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
      
        this.app = express();
       
        this.port = process.env.PORT;
       
        this.paths = {
            auth: '/api/auth',
            chefs: '/api/chefs',
            tournaments: '/api/tournaments',
        }

        // Connected DB
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes()
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {
        //Directorio
        this.app.use(express.static('public'));

        //Cors
        this.app.use(cors());

        //lectura y parceo
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.chefs, require('../routes/chef.routes'));
        this.app.use(this.paths.tournaments, require('../routes/tournament.routes'));
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }

}


module.exports = Server;