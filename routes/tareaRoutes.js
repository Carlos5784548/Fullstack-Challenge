import express from 'express';
import { crearTarea, listarTareas, editarTarea, borrarTarea } from '../controllers/tareaController.js';
import { autenticarToken } from '../middleware/autenticarToken.js';
import { validarTareaMiddleware } from '../middleware/validarTarea.js';

const router = express.Router();

// El orden es importante: primero autenticarToken, luego validarTareaMiddleware
router.post('/', autenticarToken, validarTareaMiddleware, crearTarea);
router.get('/', autenticarToken, listarTareas);
router.put('/:id', autenticarToken, validarTareaMiddleware, editarTarea);
router.delete('/:id', autenticarToken, borrarTarea);

export default router;