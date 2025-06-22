import { pool } from "../database/connectionPosgreSQL.js";
import { MENSAJES_TAREA } from '../constants/mensajesError.js';


/**
 * Repositorio para gestionar tareas en la base de datos PostgreSQL.
 * Contiene operaciones CRUD (crear, leer, actualizar, eliminar) para las tareas de un usuario.
 */
export class TareaRepository {
  /**
   * Crea una nueva tarea asociada a un usuario.
   * @param {Object} datos - Objeto con los datos de la tarea.
   * @param {string} datos.titulo - Título de la tarea (obligatorio).
   * @param {string} [datos.descripcion] - Descripción opcional de la tarea.
   * @param {string} [datos.fechaLimite] - Fecha límite (en formato ISO).
   * @param {string} [datos.estado='pendiente'] - Estado de la tarea ('pendiente', 'en progreso', 'completada').
   * @param {number} datos.usuarioId - ID del usuario que crea la tarea.
   * @returns {Promise<Object>} La tarea creada (incluyendo su ID generado).
   * @throws {Error} Si ocurre un problema con la base de datos.
   */
  async crearTarea({ titulo, descripcion, fechaLimite, estado = 'pendiente', usuarioId }) {
    try {
      const result = await pool.query(
        'INSERT INTO tareas (titulo, descripcion, fecha_limite, estado, usuario_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [titulo, descripcion, fechaLimite, estado, usuarioId]
      );
      return result.rows[0];
    } catch (error) {
      console.error('crearTarea error:', error);
      throw new Error(MENSAJES_TAREA.errorCrear);
    }
  }

  /**
   * Obtiene todas las tareas asociadas a un usuario, ordenadas por fecha límite.
   * @param {number} usuarioId - ID del usuario.
   * @returns {Promise<Array>} Lista de tareas del usuario.
   * @throws {Error} Si ocurre un error en la base de datos.
   */
  async obtenerTareasPorUsuario(usuarioId) {
    try {
      const result = await pool.query(
        'SELECT * FROM tareas WHERE usuario_id = $1 ORDER BY fecha_limite ASC',
        [usuarioId]
      );
      return result.rows;
    } catch (error) {
      console.error('obtenerTareasPorUsuario error:', error);
      throw new Error(MENSAJES_TAREA.errorObtener);
    }
  }

  /**
   * Actualiza una tarea existente por su ID.
   * @param {number} tareaId - ID de la tarea a actualizar.
   * @param {Object} campos - Campos a actualizar.
   * @param {string} campos.titulo - Nuevo título.
   * @param {string} campos.descripcion - Nueva descripción.
   * @param {string} campos.fechaLimite - Nueva fecha límite (formato ISO).
   * @param {string} campos.estado - Nuevo estado ('pendiente', 'en progreso', 'completada').
   * @returns {Promise<Object>} La tarea actualizada.
   * @throws {Error} Si la tarea no existe o si ocurre un error en la base de datos.
   */
  async actualizarTarea(tareaId, { titulo, descripcion, fechaLimite, estado }) {
    try {
      const result = await pool.query(
        'UPDATE tareas SET titulo = $1, descripcion = $2, fecha_limite = $3, estado = $4 WHERE id = $5 RETURNING *',
        [titulo, descripcion, fechaLimite, estado, tareaId]
      );
      if (result.rowCount === 0) throw new Error(MENSAJES_TAREA.noExiste);
      return result.rows[0];
    } catch (error) {
      console.error('actualizarTarea error:', error);
      throw new Error(MENSAJES_TAREA.errorActualizar);
    }
  }

  /**
   * Elimina una tarea por su ID.
   * @param {number} tareaId - ID de la tarea a eliminar.
   * @returns {Promise<Object>} La tarea eliminada.
   * @throws {Error} Si la tarea no existe o si ocurre un error en la base de datos.
   */
  async eliminarTarea(tareaId) {
    try {
      const result = await pool.query(
        'DELETE FROM tareas WHERE id = $1 RETURNING *',
        [tareaId]
      );
      if (result.rowCount === 0) throw new Error(MENSAJES_TAREA.noExiste);
      return result.rows[0];
    } catch (error) {
      console.error('eliminarTarea error:', error);
      throw new Error(MENSAJES_TAREA.errorEliminar);
    }
  }
  
}