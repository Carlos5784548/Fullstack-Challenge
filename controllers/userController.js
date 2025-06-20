import { UserRepository } from '../models/UserRepository.js';
import jwt from 'jsonwebtoken';

const userRepo = new UserRepository();

// Registro de usuario
export async function registrarUsuario(req, res) {
  const { email, password } = req.body;
  try {
    if (await userRepo.usuarioExiste(email)) {
      return res.status(400).json({ error: 'El usuario ya existe.' });
    }
    const usuario = await userRepo.crearUsuario({ email, password });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario.' });
  }
}

// Login de usuario
export async function loginUsuario(req, res) {
  const { email, password } = req.body;
  try {
    const usuario = await userRepo.login({ email, password });
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales incorrectas.' });
    }
    // Genera token JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET || 'miSuperClaveJWT_2025!@#_segura',
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión.' });
  }
}

// Validar conexión a la base de datos
export async function validarConexion(req, res) {
  const ok = await userRepo.validarConexion();
  res.json({ conexion: ok });
}