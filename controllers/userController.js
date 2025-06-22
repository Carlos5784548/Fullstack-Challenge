import {
  registrarUsuarioService,
  loginUsuarioService,
  validarConexionService
} from '../service/userService.js';

import {
  ERROR_USUARIO_REGISTRO,
  ERROR_USUARIO_LOGIN,
  ERROR_USUARIO_EXISTE,
  ERROR_CREDENCIALES_INVALIDAS,
}from '../constants/mensajesError.js';


// Registrar un nuevo usuario
export async function registrarUsuario(req, res) {
  const { email, password } = req.body;
  try {
    const usuario = await registrarUsuarioService(email, password);
    res.status(201).json(usuario);
  } catch (error) {
    if (error.message === 'EXISTE') {
      return res.status(400).json({ error: ERROR_USUARIO_EXISTE });
    }
    res.status(500).json({ error: ERROR_USUARIO_REGISTRO });
  }
}
// Iniciar sesión de usuario
export async function loginUsuario(req, res) {
  const { email, password } = req.body;
  try {
    const result = await loginUsuarioService(email, password);
    if (!result) {
      return res.status(401).json({ error: ERROR_CREDENCIALES_INVALIDAS });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: ERROR_USUARIO_LOGIN });
  }
}
// Validar conexión a la base de datos
export async function validarConexion(req, res) {
  const ok = await validarConexionService();
  res.json({ conexion: ok });
}