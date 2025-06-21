import { TareaRepository } from '../models/TareaRepository.js';

const tareaRepo = new TareaRepository();

// Crear tarea
export async function crearTarea(req, res) {
  const { titulo, descripcion, fechaLimite, estado } = req.body;
  const usuarioId = req.user.id; // Asegúrate de tener el middleware de autenticación

  try {
    const tarea = await tareaRepo.crearTarea({
      titulo,
      descripcion,
      fechaLimite,
      estado,
      usuarioId
    });
    res.status(201).json(tarea);
  } catch (error) {
    console.error('Error al crear tarea:', error);
    res.status(500).json({ error: 'Error al crear la tarea.' });
  }
}

// Listar tareas propias
export async function listarTareas(req, res) {
  const usuarioId = req.user.id;
  try {
    const tareas = await tareaRepo.obtenerTareasPorUsuario(usuarioId);
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tareas.' });
  }
}

// Editar tarea
export async function editarTarea(req, res) {
  const tareaId = req.params.id;
  const { titulo, descripcion, fechaLimite, estado } = req.body;
  try {
    const tarea = await tareaRepo.actualizarTarea(tareaId, {
      titulo,
      descripcion,
      fechaLimite,
      estado
    });
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada.' });
    }
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ error: 'Error al editar la tarea.' });
  }
}

// Borrar tarea
export async function borrarTarea(req, res) {
  const tareaId = req.params.id;
  try {
    const tarea = await tareaRepo.eliminarTarea(tareaId);
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada.' });
    }
    res.json({ mensaje: 'Tarea eliminada correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la tarea.' });
  }
}