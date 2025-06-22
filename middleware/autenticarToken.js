import jwt from 'jsonwebtoken';
import { MENSAJES_AUTH } from '../constants/mensajesError.js';

/**
 * Middleware para autenticar usuarios mediante JWT.
 * Valida el token enviado en el header Authorization.*/
export function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: MENSAJES_AUTH.TOKEN_NO_PROPORCIONADO });
  }

  const token = authHeader.split(' ')[1];
  const secret = "miSuperClaveJWT_2025!@#_segura";

  if (!secret) {
    console.error('❌ JWT_SECRET no configurado en variables de entorno.');
    return res.status(500).json({ error: MENSAJES_AUTH.ERROR_CONFIG });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('⚠️ Error al verificar JWT:', err.message);
      }
      return res.status(403).json({ error: MENSAJES_AUTH.TOKEN_INVALIDO });
    }

    req.user = decoded;
    next();
  });
}