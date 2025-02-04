const { request } = require('express');
const { response } = require('express');
const Chefs = require('../models/chef.models');

const obtenerChefs = async (req = request, res = response) => {

    let querys = { estado: true };

    const { desde = 0, limit = 5 } = req.query;

    try {

        // Construimos la consulta
        let consulta = Chefs.find(querys)
            .skip(Number(desde))
            .limit(Number(limit));


        // Ejecutamos la consulta y contamos los documentos
        const [total, chefs] = await Promise.all([
            Chefs.countDocuments(querys),
            consulta
        ]);


        res.status(200).json({
            ok: true,
            msg: 'Chefs obtenidos',
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

const obtenerChef = async (req = request, res = response) => {

    const { id } = req.params;

    try {

        const chef = await Chefs.findById(id);

        if (!chef) {
            return res.status(404).json({
                ok: false,
                msg: 'Chef no encontrado'
            })
        }

        res.status(200).json({
            ok: true,
            msg: 'Chef encontrado',
            chef
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener chef',
            error
        })
    }
};


const crearChef = async (req = request, res = response) => {

    const data = req.body;

    try {

        const chef = new Chefs(data);

        await chef.save();

        res.status(200).json({
            ok: true,
            msg: 'Chef creado',
            chef
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener chefs',
            error
        })
    }

}



const actualizarChef = async (req = request, res = response) => {

    const { id } = req.params;

    try {

        const chef = await Chefs.findByIdAndUpdate(id, req.body, { new: true });

        if (!chef) {
            return res.status(404).json({
                ok: false,
                msg: 'Chef no encontrado'
            })
        }

        res.status(200).json({
            ok: true,
            msg: 'Chef actualizado',
            chef
        });


    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar chef',
            error
        })

    }

}


const eliminarChef = async (req = request, res = response) => {

    const { id } = req.params;

    try {

        const chef = await Chefs.findByIdAndUpdate(id, { estado: false });

        if (!chef) {
            return res.status(404).json({
                ok: false,
                msg: 'Chef no encontrado'
            })
        }

        res.status(200).json({
            ok: true,
            msg: 'Chef eliminado',
            chef
        });


    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar chef',
            error
        })

    }

}

module.exports = {
    obtenerChefs,
    obtenerChef,
    crearChef,
    actualizarChef,
    eliminarChef
}