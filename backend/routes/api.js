const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controllers/usuario.controller');
const tareaCtrl = require('../controllers/tarea.controller');

router.get('/usuarios', usuarioCtrl.getAll);
router.get('/usuarios/:id', usuarioCtrl.getById);
router.post('/usuarios', usuarioCtrl.create);
router.put('/usuarios/:id', usuarioCtrl.update);
router.delete('/usuarios/:id', usuarioCtrl.remove);

router.post('/usuarios/:id/tareas', tareaCtrl.createForUsuario);
router.put('/tareas/:id', tareaCtrl.update);
router.delete('/tareas/:id', tareaCtrl.remove);

router.post('/login', usuarioCtrl.login);

module.exports = router;
