import {
  crearTareaService,
  obtenerTareasPorUsuarioService,
  actualizarTareaService,
  eliminarTareaService
} from '../service/tareaService.js';

import {
  ERROR_TAREA_CREAR,
  ERROR_TAREA_EDITAR,
  ERROR_TAREA_ELIMINAR,
  ERROR_TAREA_OBTENER,
  TAREA_NO_ENCONTRADA
} from '../constants/mensajesError.js';

export async function crearTarea(req, res) {
  const { titulo, descripcion, fechaLimite, estado } = req.body;
  const usuarioId = req.user.id;

  try {
    const tarea = await crearTareaService({
      titulo,
      descripcion,
      fechaLimite,
      estado,
      usuarioId
    });
    res.status(201).json(tarea);
  } catch (error) {
    console.error('Error al crear tarea:', error);
    res.status(500).json({ error: ERROR_TAREA_CREAR });
  }
}

export async function listarTareas(req, res) {
  const usuarioId = req.user.id;
  try {
    const tareas = await obtenerTareasPorUsuarioService(usuarioId);
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: ERROR_TAREA_OBTENER });
  }
}

export async function editarTarea(req, res) {
  const tareaId = req.params.id;
  const { titulo, descripcion, fechaLimite, estado } = req.body;

  try {
    const tarea = await actualizarTareaService(tareaId, {
      titulo,
      descripcion,
      fechaLimite,
      estado
    });

    if (!tarea) {
      return res.status(404).json({ error: TAREA_NO_ENCONTRADA });
    }

    res.json(tarea);
  } catch (error) {
    res.status(500).json({ error: ERROR_TAREA_EDITAR });
  }
}

export async function borrarTarea(req, res) {
  const tareaId = req.params.id;
  try {
    const tarea = await eliminarTareaService(tareaId);
    if (!tarea) {
      return res.status(404).json({ error: TAREA_NO_ENCONTRADA });
    }
    res.json({ mensaje: 'Tarea eliminada correctamente.' });
  } catch (error) {
    res.status(500).json({ error: ERROR_TAREA_ELIMINAR });
  }
}
