const { Router } = require('express');
const { obtenerTournaments, obtenerTournament, actualizarTournament, crearTournament, eliminarTournament, registrarChefATorneo, registrarResultadoDeChef, obtenerRankingDeTorneo } = require('../controllers/tournament.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { chefYaExisteEnTorneo, chefYaExisteEnRanking } = require('../helpers/db-validators');
const { check } = require('express-validator');

const router = Router();

// Funcion para obtener todos los usuarios
router.get('/', obtenerTournaments);


// Funciones para gestionar un solo usuario por id
router.get('/:id', obtenerTournament);

// obtener rankings
router.get('/:id_torneo/ranking', obtenerRankingDeTorneo);

// Funciones para crear, actualizar y eliminar usuarios
router.put('/:id', actualizarTournament);

// Funciones para crear y eliminar usuarios
router.post('/', crearTournament);

// Registrar participante a torneo
router.put('/:id_torneo/register/:id_chef', [
    check('id_torneo').custom((id_torneo, { req }) => chefYaExisteEnTorneo(id_torneo, req.params.id_chef)),
    validarCampos,
], registrarChefATorneo);

// Registrar resultado por chef
router.put('/:id_torneo/submit/:id_chef',[
        check('id_torneo').custom((id_torneo, { req }) => chefYaExisteEnRanking(id_torneo, req.params.id_chef)),
        validarCampos,
    ],registrarResultadoDeChef);

// Funcion para eliminar un usuario por id
router.delete('/:id', eliminarTournament);


module.exports = router;