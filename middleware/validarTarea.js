import jwt from 'jsonwebtoken';

const ESTADOS_VALIDOS = ['pendiente', 'en progreso', 'completada'];
const MAX_TITULO = 100;
const MAX_DESCRIPCION = 1000;

export function validarTareaMiddleware(req, res, next) {
  const { titulo, descripcion, estado, fechaLimite } = req.body;
  const errores = [];

  // Título obligatorio y longitud máxima
  if (!titulo || typeof titulo !== 'string' || titulo.trim() === '') {
    errores.push('El título es obligatorio.');
  } else if (titulo.length > MAX_TITULO) {
    errores.push(`El título no puede superar los ${MAX_TITULO} caracteres.`);
  }

  // Descripción longitud máxima
  if (descripcion && descripcion.length > MAX_DESCRIPCION) {
    errores.push(`La descripción no puede superar los ${MAX_DESCRIPCION} caracteres.`);
  }

  // Estado válido
  if (estado && !ESTADOS_VALIDOS.includes(estado)) {
    errores.push('El estado debe ser: pendiente, en progreso o completada.');
  }

  // Fecha límite válida y no en el pasado
  if (fechaLimite) {
    const fecha = Date.parse(fechaLimite);
    if (isNaN(fecha)) {
      errores.push('La fecha límite no es válida.');
    } else if (fecha < Date.now()) {
      errores.push('La fecha límite no puede ser en el pasado.');
    }
  }

  // Campos extra no permitidos
  const camposPermitidos = ['titulo', 'descripcion', 'estado', 'fechaLimite'];
  Object.keys(req.body).forEach((campo) => {
    if (!camposPermitidos.includes(campo)) {
      errores.push(`El campo '${campo}' no está permitido.`);
    }
  });

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }
  next();
}

