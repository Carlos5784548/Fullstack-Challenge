export function validarUsuarioMiddleware(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y password son obligatorios.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'El email no tiene un formato válido.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'El password debe tener al menos 6 caracteres.' });
  }
  next();
}