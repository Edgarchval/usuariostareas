const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./usuario.model');

const Tarea = sequelize.define('Tarea', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  titulo: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.TEXT },
  estatus: { type: DataTypes.ENUM('pendiente', 'en_progreso', 'completada'), defaultValue: 'pendiente' },
  fecha_entrega: { type: DataTypes.DATE }
}, { timestamps: false, tableName: 'tareas' });

Tarea.belongsTo(Usuario, { foreignKey: 'usuarioId', onDelete: 'CASCADE' });
Usuario.hasMany(Tarea, { foreignKey: 'usuarioId' });

module.exports = Tarea;
