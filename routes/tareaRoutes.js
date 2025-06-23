import express from 'express';
import { crearTarea, listarTareas, editarTarea, borrarTarea } from '../controllers/tareaController.js';
import { autenticarToken } from '../middleware/autenticarToken.js';
import { validarTareaMiddleware } from '../middleware/validarTarea.js';

const router = express.Router();

// Importamos las funciones del controlador de tareas
// y los middlewares necesarios para autenticar al usuario y validar los datos de la tarea
router.post('/', autenticarToken, validarTareaMiddleware, crearTarea);
router.get('/', autenticarToken, listarTareas);
router.put('/:id', autenticarToken, validarTareaMiddleware, editarTarea);
router.delete('/:id', autenticarToken, borrarTarea);

export default router;