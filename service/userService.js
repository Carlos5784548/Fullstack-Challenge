import { UserRepository } from '../models/UserRepository.js';
import jwt from 'jsonwebtoken';

const userRepo = new UserRepository();

export async function registrarUsuarioService(email, password) {
  if (await userRepo.usuarioExiste(email)) {
    throw new Error('EXISTE'); // manejaremos este error en el controller
  }
  return await userRepo.crearUsuario({ email, password });
}

export async function loginUsuarioService(email, password) {
  const usuario = await userRepo.login({ email, password });
  if (!usuario) return null;

  // Generar JWT
  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    process.env.JWT_SECRET || 'miSuperClaveJWT_2025!@#_segura',
    { expiresIn: '1h' }
  );

  return { token };
}

export async function validarConexionService() {
  return await userRepo.validarConexion();
}