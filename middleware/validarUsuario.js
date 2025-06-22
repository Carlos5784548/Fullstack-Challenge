import { MENSAJES_USUARIO } from '../constants/mensajesError.js';

export function validarUsuarioMiddleware(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: MENSAJES_USUARIO.camposObligatorios });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: MENSAJES_USUARIO.emailInvalido });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: MENSAJES_USUARIO.passwordCorto });
  }

  next();
}