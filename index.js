import express from 'express';
import userRoutes from './routes/userRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';
import cors from 'cors';



const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200' // Cambia el puerto si tu Angular usa otro
}));

// Rutas principales
app.use('/usuarios', userRoutes);
app.use('/tareas', tareaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});