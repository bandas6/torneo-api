const Chef = require("../models/chef.models");
const Tournament = require('../models/tournament.models');

const usuarioExiste = async (correo) => {

    const usuario = await Chef.findOne({ correo });

    if (usuario) {
        throw new Error(`Ya existe un usuario registrado con este correo`);
    }

}


const usuarioConCorreoNoExiste = async (correo) => {

    if (!correo) {
        return
    }

    const usuario = await Chef.findOne({ correo });

    if (!usuario) {
        throw new Error(`El correo ${correo} no existe`);
    }

}

const chefYaExisteEnTorneo = async (id_torneo, id_chef) => {

    const torneo = await Tournament.findById(id_torneo);

    if (!torneo) {
        throw new Error(`El torneo con ID ${id_torneo} no existe.`);
    }

    const chefRegistrado = torneo.chefs.includes(id_chef);

    if (chefRegistrado) {
        throw new Error(`El chef con ID ${id_chef} ya está registrado en este torneo.`);
    }

};

const chefYaExisteEnRanking = async (id_torneo, id_chef) => {
   
    const torneo = await Tournament.findById(id_torneo);

    if (!torneo) {
        throw new Error(`El torneo con ID ${id_torneo} no existe.`);
    }

    // Verificamos si el chef ya está en el ranking con `.some()`
    const chefEnRanking = torneo.ranking.some(entry => entry.chef.toString() === id_chef);

    if (chefEnRanking) {
        throw new Error(`El chef con ID ${id_chef} ya está en el ranking del torneo.`);
    }

    return true; // Si no hay error, la validación pasa
};


module.exports = {
    usuarioExiste,
    usuarioConCorreoNoExiste,
    chefYaExisteEnTorneo,
    chefYaExisteEnRanking
}