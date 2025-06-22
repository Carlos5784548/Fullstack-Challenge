import { MENSAJES_TAREA_CAMPOS } from '../constants/mensajesError.js';

const ESTADOS_VALIDOS = ['pendiente', 'en progreso', 'completada'];
const MAX_TITULO = 100;
const MAX_DESCRIPCION = 1000;

export function validarTareaMiddleware(req, res, next) {
  const { titulo, descripcion, estado, fechaLimite } = req.body;
  const errores = [];

  // Título obligatorio y longitud máxima
  if (!titulo || typeof titulo !== 'string' || titulo.trim() === '') {
    errores.push(MENSAJES_TAREA_CAMPOS.tituloObligatorio);
  } else if (titulo.length > MAX_TITULO) {
    errores.push(MENSAJES_TAREA_CAMPOS.tituloMaximo(MAX_TITULO));
  }

  // Descripción longitud máxima
  if (descripcion && descripcion.length > MAX_DESCRIPCION) {
    errores.push(MENSAJES_TAREA_CAMPOS.descripcionMaxima(MAX_DESCRIPCION));
  }

  // Estado válido
  if (estado && !ESTADOS_VALIDOS.includes(estado)) {
    errores.push(MENSAJES_TAREA_CAMPOS.estadoInvalido);
  }

  // Fecha límite válida y no en el pasado
  if (fechaLimite) {
    const fecha = Date.parse(fechaLimite);
    if (isNaN(fecha)) {
      errores.push(MENSAJES_TAREA_CAMPOS.fechaInvalida);
    } else if (fecha < Date.now()) {
      errores.push(MENSAJES_TAREA_CAMPOS.fechaPasada);
    }
  }

  // Campos extra no permitidos
  const camposPermitidos = ['titulo', 'descripcion', 'estado', 'fechaLimite'];
  Object.keys(req.body).forEach((campo) => {
    if (!camposPermitidos.includes(campo)) {
      errores.push(MENSAJES_TAREA_CAMPOS.campoNoPermitido(campo));
    }
  });

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  next();
}

