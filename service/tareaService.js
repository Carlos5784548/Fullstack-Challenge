import { TareaRepository } from '../models/TareaRepository.js';

const tareaRepo = new TareaRepository();

export const crearTareaService = async (datosTarea) => {
  return await tareaRepo.crearTarea(datosTarea);
};

export const obtenerTareasPorUsuarioService = async (usuarioId) => {
  return await tareaRepo.obtenerTareasPorUsuario(usuarioId);
};

export const actualizarTareaService = async (tareaId, datosActualizados) => {
  return await tareaRepo.actualizarTarea(tareaId, datosActualizados);
};

export const eliminarTareaService = async (tareaId) => {
  return await tareaRepo.eliminarTarea(tareaId);
};