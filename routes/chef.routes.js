const { Router } = require('express');
const { obtenerChef, obtenerChefs, actualizarChef, crearChef, eliminarChef } = require('../controllers/chef.controller');

const router = Router();

// Funcion para obtener todos los usuarios
router.get('/',  obtenerChefs);


// Funciones para gestionar un solo usuario por id
router.get('/:id', obtenerChef);


// Funciones para crear, actualizar y eliminar usuarios
router.put('/:id',  actualizarChef);


// Funciones para crear y eliminar usuarios
router.post('/', crearChef);


// Funcion para eliminar un usuario por id
router.delete('/:id', eliminarChef);


module.exports = router;