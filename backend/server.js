const express = require('express');  
// Importamos Express para crear el servidor

const cors = require('cors');  
// Middleware para permitir peticiones desde otros dominios (CORS)

require('dotenv').config();  
// Carga las variables del archivo .env al entorno (process.env)

const apiRoutes = require('./routes/api');  
// Importamos el archivo donde están todas las rutas de la API


const app = express();  
// Inicializamos la aplicación Express


// ------------------------------------------------------
// MIDDLEWARES
// ------------------------------------------------------

app.use(cors());  
// Habilita CORS para permitir solicitudes desde cualquier origen

app.use(express.json());  
// Permite recibir y procesar JSON en el body de las peticiones


// ------------------------------------------------------
// RUTAS PRINCIPALES
// ------------------------------------------------------

app.use('/api', apiRoutes);  
// Montamos las rutas en la ruta base "/api"
// Ejemplo: /api/usuarios, /api/login, /api/tareas


// ------------------------------------------------------
// CONFIGURACIÓN DEL SERVIDOR
// ------------------------------------------------------

const PORT = process.env.PORT || 4000;  
// Tomamos el puerto desde .env o usamos 4000 por defecto

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  // Mensaje que confirma que el servidor está activo
});
