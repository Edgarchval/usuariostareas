// backend/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize, Usuario, Tarea } = require('./models'); // importa tus modelos

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Prueba de conexión
sequelize.authenticate()
  .then(() => console.log('✅ Conexión a la base de datos exitosa'))
  .catch(err => console.error('❌ Error de conexión:', err));

// Sincronizar modelos con la base de datos
sequelize.sync({ alter: true })
  .then(() => console.log('📦 Modelos sincronizados'))
  .catch(err => console.error('❌ Error al sincronizar modelos:', err));

// RUTAS ===================

// Ruta principal
app.get('/', (req, res) => {
  res.send('🚀 API funcionando correctamente!');
});

// Obtener usuarios con tareas
app.get('/api/usuarios', async (req, res) => {
  const usuarios = await Usuario.findAll({ include: Tarea });
  res.json(usuarios);
});

// Crear usuario
app.post('/api/usuarios', async (req, res) => {
  const nuevo = await Usuario.create(req.body);
  res.json(nuevo);
});

// Obtener tareas
app.get('/api/tareas', async (req, res) => {
  const tareas = await Tarea.findAll();
  res.json(tareas);
});

// Crear tarea
app.post('/api/tareas', async (req, res) => {
  const nueva = await Tarea.create(req.body);
  res.json(nueva);
});

// =========================

// Puerto del servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`));
