const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { usuarioConCorreoNoExiste } = require('../helpers/db-validators');


const router = Router();


router.post('/', [
    check('password', 'el contraseña es obligatoria').not().isEmpty(),
    check('correo').custom(usuarioConCorreoNoExiste),
    validarCampos
], login);

module.exports = router;
