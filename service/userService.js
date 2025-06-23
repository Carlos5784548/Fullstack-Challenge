import { UserRepository } from '../models/UserRepository.js';
import jwt from 'jsonwebtoken';

const userRepo = new UserRepository();
// Creamos una instancia del repositorio de usuarios

// Exportamos las funciones del servicio de usuarios para que puedan ser utilizadas en los controladores
// Estas funciones encapsulan la lógica de negocio relacionada con los usuarios

// y se encargan de interactuar con el repositorio de usuarios
// Servicio para registrar un nuevo usuario
export async function registrarUsuarioService(email, password) {
  if (await userRepo.usuarioExiste(email)) {
    throw new Error('EXISTE'); // manejaremos este error en el controller
  }
  return await userRepo.crearUsuario({ email, password });
}
// Servicio para iniciar sesión de un usuario
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
// Servicio para validar la conexión del usuario
// Este servicio verifica si el usuario está conectado y devuelve su información
export async function validarConexionService() {
  return await userRepo.validarConexion();
}