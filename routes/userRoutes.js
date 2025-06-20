import express from 'express';
import { registrarUsuario, loginUsuario } from '../controllers/userController.js';
import { validarUsuarioMiddleware } from '../middleware/validarUsuario.js';

const router = express.Router();

router.post('/register', validarUsuarioMiddleware, registrarUsuario);
router.post('/login', validarUsuarioMiddleware, loginUsuario);

export default router;