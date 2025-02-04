const { request } = require('express');
const { response } = require('express');
const Tournament = require('../models/tournament.models');

const obtenerTournaments = async (req = request, res = response) => {

    let querys = { estado: true };

    const { desde = 0, limit = 5 } = req.query;

    try {

        // Construimos la consulta
        let consulta = Tournament.find(querys)
            .skip(Number(desde))
            .limit(Number(limit))
            .populate('chefs')
            .populate('ranking.chef');


        // Ejecutamos la consulta y contamos los documentos
        const [total, chefs] = await Promise.all([
            Tournament.countDocuments(querys),
            consulta
        ]);


        res.status(200).json({
            ok: true,
            msg: 'Tournament obtenidos',
            total,
            chefs
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener chefs',
            error
        })
    }

}

const obtenerTournament = async (req = request, res = response) => {

    const { id } = req.params;

    try {

        const tournament = await Tournament.findById(id);

        if (!tournament) {
            return res.status(404).json({
                ok: false,
                msg: 'Tournament no encontrado'
            })
        }

        res.status(200).json({
            ok: true,
            msg: 'Tournament encontrado',
            tournament
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener tournament',
            error
        })
    }
};


const crearTournament = async (req = request, res = response) => {

    const data = req.body;

    try {

        const tournament = new Tournament(data);

        await tournament.save();

        res.status(200).json({
            ok: true,
            msg: 'Tournament creado',
            tournament
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener chefs',
            error
        })
    }

}

const registrarChefATorneo = async (req = request, res = response) => {

    const { id_torneo, id_chef } = req.params;

    try {

        const tournamentSerch = await Tournament.findById(id_torneo).lean();
        
        
        if (!tournamentSerch) {
            return res.status(404).json({
                ok: false,
                msg: 'Tournament no encontrado'
            })
        }
        
        const { maxChefs, chefs } = tournamentSerch;
                
        if (tournamentSerch.chefs.length >= maxChefs) {
            return res.status(400).json({
                ok: false,
                msg: `se ha alcanzado el maximo permitido de participantes ${maxChefs}`
            })
        }

        const tournamentUpdate = await Tournament.findByIdAndUpdate(id_torneo, { $push: { chefs: id_chef } }, { new: true });

        res.status(200).json({
            ok: true,
            msg: 'Chef añadido al torneo',
            tournamentUpdate
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error al añadir chef al torneo',
            error
        })

    }

}

const registrarResultadoDeChef = async (req = request, res = response) => {

    const { id_torneo, id_chef } = req.params;
    const { score } = req.body;

    if (!score || score > 100) {
        return res.status(400).json({
            ok: false,
            msg: 'El score debe ser un número positivo y tambien debe ser menor o igual 100'
        })
    }

    try {

        const tournament = await Tournament.findByIdAndUpdate(id_torneo, { $push: { ranking: { chef: id_chef, score } } }, { new: true });

        if (!tournament) {
            return res.status(404).json({
                ok: false,
                msg: 'Tournament no encontrado'
            })
        }

        res.status(200).json({
            ok: true,
            msg: 'Chef añadido al torneo',
            tournament
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error al añadir chef al torneo',
            error
        })

    }


}

const obtenerRankingDeTorneo = async (req, res) => {
    const { id_torneo } = req.params;

    try {
        const tournament = await Tournament.findById(id_torneo)
            .populate('ranking.chef')
            .lean(); 

        if (!tournament) {
            return res.status(404).json({
                ok: false,
                msg: 'Tournament no encontrado'
            });
        }

        // Ordenar el ranking directamente
        tournament.ranking.sort((a, b) => b.score - a.score);

        res.status(200).json({
            ok: true,
            msg: 'Ranking obtenido exitosamente',
            ranking: tournament.ranking
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener el ranking del torneo',
            error
        });
    }
};



const actualizarTournament = async (req = request, res = response) => {

    const { id } = req.params;

    try {

        const tournament = await Tournament.findByIdAndUpdate(id, req.body, { new: true });

        if (!tournament) {
            return res.status(404).json({
                ok: false,
                msg: 'Tournament no encontrado'
            })
        }

        res.status(200).json({
            ok: true,
            msg: 'Tournament actualizado',
            tournament
        });


    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar tournament',
            error
        })

    }

}


const eliminarTournament = async (req = request, res = response) => {

    const { id } = req.params;

    try {

        const tournament = await Tournament.findByIdAndUpdate(id, { estado: false });

        if (!tournament) {
            return res.status(404).json({
                ok: false,
                msg: 'Tournament no encontrado'
            })
        }

        res.status(200).json({
            ok: true,
            msg: 'Tournament eliminado',
            tournament
        });


    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar tournament',
            error
        })

    }

}

module.exports = {
    obtenerTournaments,
    obtenerTournament,
    obtenerRankingDeTorneo,
    crearTournament,
    actualizarTournament,
    eliminarTournament,
    registrarChefATorneo,
    registrarResultadoDeChef
}