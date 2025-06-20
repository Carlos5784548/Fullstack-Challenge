import express from 'express';
import userRoutes from './routes/userRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas principales
app.use('/usuarios', userRoutes);
app.use('/tareas', tareaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});