import bcrypt from 'bcrypt';
import pool from '../database/connectionPosgreSQL.js';


export class UserRepository {
 
  // Método para verificar si un usuario ya existe en la base de datos
  async usuarioExiste(email) {
    const result = await pool.query('SELECT 1 FROM usuarios WHERE email = $1', [email]);
    return result.rowCount > 0;
  }

  // Método para crear un nuevo usuario

  async crearUsuario({ email, password }) {
    // Hashea la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(password, 10); // 10 es el "salt rounds"
    const result = await pool.query(
      'INSERT INTO usuarios (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword ]
    );
    // Al devolver el usuario, elimina el campo password
    const usuario = result.rows[0];
    delete usuario.password;
    return usuario;
  }
  
// Método para iniciar sesión de un usuario
  async login({ email, password }) {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    );
    const usuario= result.rows[0]
    if (!usuario) {
      return null; // Usuario no encontrado
    }
    // Verifica la contraseña
    const passwordMatch = await bcrypt.compare(password, usuario.password);
    if (!passwordMatch) return null;

  return usuario; // Devuelve el usuario si las credenciales son correctas  
  }

//Metodo valiedar conxión base de datos
  async validarConexion() {
    try {
      await pool.query('SELECT 1');
      return true;
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
      return false;
    }
  }

}