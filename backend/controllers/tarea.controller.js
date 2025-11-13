const { Tarea, Usuario } = require('../models');

exports.createForUsuario = async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
  const tarea = await Tarea.create({ ...req.body, usuarioId: usuario.id });
  res.status(201).json(tarea);
};

exports.update = async (req, res) => {
  const tarea = await Tarea.findByPk(req.params.id);
  if (!tarea) return res.status(404).json({ message: 'No existe' });
  await tarea.update(req.body);
  res.json(tarea);
};

exports.remove = async (req, res) => {
  const tarea = await Tarea.findByPk(req.params.id);
  if (!tarea) return res.status(404).json({ message: 'No existe' });
  await tarea.destroy();
  res.json({ message: 'Eliminada correctamente' });
};
