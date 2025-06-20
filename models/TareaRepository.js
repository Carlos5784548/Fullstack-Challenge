import { pool } from "../database/connectionPosgreSQL.js";

export class TareaRepository {

  // Método para crear una nueva tarea
  async crearTarea({ titulo, descripcion, fechaLimite, estado = 'pendiente', usuarioId }) {
    const result = await pool.query(
      'INSERT INTO tareas (titulo, descripcion, fecha_limite, estado, usuario_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [titulo, descripcion, fechaLimite, estado, usuarioId]
    );
    return result.rows[0];
  }

  // Método para obtener todas las tareas de un usuario
  async obtenerTareasPorUsuario(usuarioId) {
    const result = await pool.query(
      'SELECT * FROM tareas WHERE usuario_id = $1',
      [usuarioId]
    );
    return result.rows;
  }

  // Método para actualizar una tarea
  async actualizarTarea(tareaId, { titulo, descripcion, fechaLimite, estado }) {
    const result = await pool.query(
      'UPDATE tareas SET titulo = $1, descripcion = $2, fecha_limite = $3, estado = $4 WHERE id = $5 RETURNING *',
      [titulo, descripcion, fechaLimite, estado, tareaId]
    );
    return result.rows[0];
  }

  // Método para eliminar una tarea
  async eliminarTarea(tareaId) {
    const result = await pool.query(
      'DELETE FROM tareas WHERE id = $1 RETURNING *',
      [tareaId]
    );
    return result.rows[0];
  }
}