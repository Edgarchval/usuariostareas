const express = require('express');
const router = express.Router();  
// Creamos un router de Express para manejar las rutas de la API

const usuarioCtrl = require('../controllers/usuario.controller'); 
// Controlador que contiene todas las funciones relacionadas con usuarios

const tareaCtrl = require('../controllers/tarea.controller'); 
// Controlador que contiene las funciones relacionadas con tareas


// ------------------------------------------------------
// RUTAS PARA USUARIOS
// ------------------------------------------------------

router.get('/usuarios', usuarioCtrl.getAll);
// Obtener todos los usuarios

router.get('/usuarios/:id', usuarioCtrl.getById);
// Obtener un usuario por ID (incluye sus tareas)

router.post('/usuarios', usuarioCtrl.create);
// Crear un nuevo usuario

router.put('/usuarios/:id', usuarioCtrl.update);
// Actualizar usuario por su ID (solo existe una ruta PUT para evitar duplicados)

router.delete('/usuarios/:id', usuarioCtrl.remove);
// Eliminar un usuario por su ID


// ------------------------------------------------------
// RUTAS PARA TAREAS
// ------------------------------------------------------

router.post('/usuarios/:id/tareas', tareaCtrl.createForUsuario);
// Crear una tarea asociada a un usuario específico

router.put('/tareas/:id', tareaCtrl.update);
// Actualizar una tarea por su ID

router.delete('/tareas/:id', tareaCtrl.remove);
// Eliminar una tarea por su ID

// GET TODAS LAS TAREAS
router.get('/tareas', tareaCtrl.getAll);

// ------------------------------------------------------
// LOGIN
// ------------------------------------------------------

router.post('/login', usuarioCtrl.login);
// Ruta para iniciar sesión (login básico sin JWT por ahora)


// Exportamos el router para usarlo en app.js o server.js
module.exports = router;
