# WebSever + RestServer

************Tournament API************
    API para gestionar torneos de chefs, permitiendo registrar participantes, manejar rankings y obtener información de los torneos.

************Características************
    Creación, actualización y eliminación de torneos.
    Registro de chefs en torneos.
    Gestión de rankings con puntuaciones.
    API basada en Node.js, Express y MongoDB con Mongoose.

📦 Instalación

************Clona el repositorio************
    git clone https://github.com/bandas6/torneo-api
    cd tournament-api

************Instala las dependencias************
    npm install
    
************Configura las variables de entorno************
    Crea un archivo .env en la raíz del proyecto y define las variables necesarias:

    PORT=8080
    MONGO_DBCNN = mongodb+srv://sinistetraa:hCab3NPY0JVC90Pl@cluster0.rpcpd.mongodb.net/data
    SECRETORPRIVATEKEY=Creand0MySecreT1Aid1e

************Inicia el servidor************
    npm start
---con nodemon:***** nodemon start*******

📌 Endpoints disponibles
    1 Torneos
        GET /api/tournaments → Obtener todos los torneos
        POST /api/tournaments → Crear un nuevo torneo
        PUT /api/tournaments/:id → Actualizar un torneo
        DELETE /api/tournaments/:id → Eliminar un torneo
    2 Chefs en torneos
        PUT /api/tournaments/:id_torneo/register/:id_chef → Registrar chef
        GET /api/tournaments/:id_torneo/ranking → Obtener ranking
    3 Chefs
        GET /api/chefs → Obtener todos los torneos
        POST /api/chefs → Crear un nuevo torneo
        PUT /api/chefs/:id → Actualizar un torneo
        DELETE /api/chefs/:id → Eliminar un torneo