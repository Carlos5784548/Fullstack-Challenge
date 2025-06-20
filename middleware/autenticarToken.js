import jwt from 'jsonwebtoken';

export function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    console.log('No token');
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET || 'miSuperClaveJWT_2025!@#_segura', (err, usuario) => {
    if (err) {
      console.log('JWT error:', err.message);
      return res.sendStatus(403);
    }
    req.user = usuario;
    next();
  });
}