const { response, request } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require("../models/chef.models");
const { generarJWT } = require("../helpers/generar-jwt");


const login = async (req = request, resp = response) => {

    const { correo, nombreUsuario, password } = req.body;
    const query = nombreUsuario ? { nombreUsuario } : { correo };

    try {
        
        // Buscar usuario en base al nombre de usuario o correo
        const usuario = await Usuario.findOne(query);
        if (!usuario) {
            return resp.status(400).json({ msg: 'El usuario no existe', ok: false });
        }

        // Verificar estado del usuario
        if (!usuario.estado) {
            return resp.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false',
                ok: false
            });
        }

        // Verificar contraseña
        const isPasswordValid = bcryptjs.compareSync(password, usuario.password);
        if (!isPasswordValid) {
            return resp.status(400).json({
                msg: 'Usuario / Password no son correctos - password',
                ok: false
            });
        }

        // Generar token JWT
        const token = await generarJWT(usuario.id);

        // Responder con éxito
        return resp.status(200).json({
            ok: true,
            data: {
                usuario,
                token
            }
        });

    } catch (error) {
        console.error('Error en login:', error); // Añadir log para rastrear errores específicos
        return resp.status(500).json({
            msg: 'Error en el servidor. Hable con el administrador.',
            error: error.message || error,
            ok: false
        });
    }
};


module.exports = {
    login
}