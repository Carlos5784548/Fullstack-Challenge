import bcrypt from 'bcrypt';
import pool from '../database/connectionPosgreSQL.js';
import { MENSAJES_USER } from '../constants/mensajesError.js';

export class UserRepository {
 /**
   * Verifica si un usuario ya existe en la base de datos.
   *
   * @param {string} email - Correo electrónico a verificar.
   * @returns {Promise<boolean>} `true` si el usuario ya existe, `false` en caso contrario.
   * @throws {Error} Si ocurre un error en la base de datos.
   */
  async usuarioExiste(email) {
    try {
      const result = await pool.query(
        'SELECT 1 FROM usuarios WHERE email = $1',
        [email]
      );
      return result.rowCount > 0;
    } catch (error) {
      console.error('usuarioExiste error:', error);
      throw new Error(MENSAJES_USER.errorConsulta);
    }
  }

  /**
   * Crea un nuevo usuario hasheando su contraseña antes de guardarlo.
   *
   * @param {Object} datos - Objeto con los datos del nuevo usuario.
   * @param {string} datos.email - Email del usuario.
   * @param {string} datos.password - Contraseña en texto plano.
   * @returns {Promise<Object>} El usuario creado (sin la contraseña).
   * @throws {Error} Si ocurre un error durante la inserción o el hashing.
   */
  async crearUsuario({ email, password }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10); // salt rounds
      const result = await pool.query(
        'INSERT INTO usuarios (email, password) VALUES ($1, $2) RETURNING *',
        [email, hashedPassword]
      );

      const usuario = result.rows[0];
      if (!usuario) throw new Error(MENSAJES_USER.errorCreacion);

      delete usuario.password;
      return usuario;
    } catch (error) {
      console.error('crearUsuario error:', error);
      throw new Error(MENSAJES_USER.errorCreacion);
    }
  }

  /**
   * Valida el login de un usuario comparando la contraseña hasheada.
   *
   * @param {Object} datos - Objeto con email y password.
   * @param {string} datos.email - Email del usuario.
   * @param {string} datos.password - Contraseña en texto plano.
   * @returns {Promise<Object|null>} Usuario si es válido, `null` si no coincide.
   * @throws {Error} Si ocurre un error en la base de datos.
   */
  async login({ email, password }) {
    try {
      const result = await pool.query(
        'SELECT * FROM usuarios WHERE email = $1',
        [email]
      );

      const usuario = result.rows[0];
      if (!usuario) return null;

      const match = await bcrypt.compare(password, usuario.password);
      if (!match) return null;

      delete usuario.password;
      return usuario;
    } catch (error) {
      console.error('login error:', error);
      throw new Error(MENSAJES_USER.errorLogin);
    }
  }

  /**
   * Verifica si la base de datos responde correctamente.
   *
   * @returns {Promise<boolean>} `true` si hay conexión, `false` si falla.
   */
  async validarConexion() {
    try {
      await pool.query('SELECT 1');
      return true;
    } catch (error) {
      console.error('validarConexion error:', error);
      return false;
    }
  }

}