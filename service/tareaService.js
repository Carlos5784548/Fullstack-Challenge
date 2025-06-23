import { TareaRepository } from '../models/TareaRepository.js';
// Importamos el repositorio de tareas para interactuar con la base de datos
// y las funciones que implementan la lógica de negocio para las tareas
const tareaRepo = new TareaRepository();
// Creamos una instancia del repositorio de tareas

// Exportamos las funciones del servicio de tareas para que puedan ser utilizadas en los controladores
// Estas funciones encapsulan la lógica de negocio relacionada con las tareas
// y se encargan de interactuar con el repositorio de tareas

// Servicio para crear una nueva tarea
export const crearTareaService = async (datosTarea) => {
  return await tareaRepo.crearTarea(datosTarea);
};
// Servicio para obtener las tareas de un usuario específico
export const obtenerTareasPorUsuarioService = async (usuarioId) => {
  return await tareaRepo.obtenerTareasPorUsuario(usuarioId);
};
// Servicio para actualizar una tarea existente
// Este servicio recibe el ID de la tarea y los datos actualizados, y llama al repositorio para realizar la operación
export const actualizarTareaService = async (tareaId, datosActualizados) => {
  return await tareaRepo.actualizarTarea(tareaId, datosActualizados);
};
// Servicio para eliminar una tarea por su ID
// Este servicio recibe el ID de la tarea a eliminar y llama al repositorio para realizar la operación
export const eliminarTareaService = async (tareaId) => {
  return await tareaRepo.eliminarTarea(tareaId);
};