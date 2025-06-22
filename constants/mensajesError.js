export const MENSAJES_TAREA = {
  errorCrear: 'Error al crear la tarea.',
  errorObtener: 'Error al obtener las tareas.',
  errorActualizar: 'Error al actualizar la tarea.',
  errorEliminar: 'Error al eliminar la tarea.',
  noExiste: 'La tarea no existe.',
};


export const MENSAJES_USER = {
  errorConsulta: 'Error al verificar existencia del usuario.',
  errorCreacion: 'Error al crear el usuario.',
  errorLogin: 'Error al intentar iniciar sesión.',
};


 export const MENSAJES_AUTH = {
  TOKEN_NO_PROPORCIONADO: 'Token no proporcionado o mal formado.',
  TOKEN_INVALIDO: 'Token inválido o expirado.',
  ERROR_CONFIG: 'Error de configuración del servidor. JWT_SECRET no definido.'
};

export const MENSAJES_TAREA_CAMPOS = {
  tituloObligatorio: 'El título es obligatorio.',
  tituloMaximo: (max) => `El título no puede superar los ${max} caracteres.`,
  descripcionMaxima: (max) => `La descripción no puede superar los ${max} caracteres.`,
  estadoInvalido: 'El estado debe ser: pendiente, en progreso o completada.',
  fechaInvalida: 'La fecha límite no es válida.',
  fechaPasada: 'La fecha límite no puede ser en el pasado.',
  campoNoPermitido: (campo) => `El campo '${campo}' no está permitido.`,
};


export const MENSAJES_USUARIO = {
  camposObligatorios: 'Email y password son obligatorios.',
  emailInvalido: 'El email no tiene un formato válido.',
  passwordCorto: 'El password debe tener al menos 6 caracteres.'
};

// Mensajes de error para tareas
export const ERROR_TAREA_CREAR = 'Error al crear la tarea.';
export const ERROR_TAREA_EDITAR = 'Error al editar la tarea.';
export const ERROR_TAREA_ELIMINAR = 'Error al eliminar la tarea.';
export const ERROR_TAREA_OBTENER = 'Error al obtener las tareas.';
export const TAREA_NO_ENCONTRADA = 'Tarea no encontrada.';

// Mensajes de error para usuarios
export const ERROR_USUARIO_REGISTRO = 'Error al registrar usuario.';
export const ERROR_USUARIO_LOGIN = 'Error al iniciar sesión.';
export const ERROR_USUARIO_EXISTE = 'El usuario ya existe.';
export const ERROR_CREDENCIALES_INVALIDAS = 'Credenciales incorrectas.';
