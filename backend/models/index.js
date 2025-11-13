const sequelize = require('../config/database');
const Usuario = require('./usuario.model');
const Tarea = require('./tarea.model');

module.exports = { sequelize, Usuario, Tarea };
