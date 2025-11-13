const { Usuario, Tarea } = require('../models');

exports.getAll = async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
};

exports.getById = async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id, { include: Tarea });
  if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(usuario);
};

exports.create = async (req, res) => {
  try {
    const { nombre, email, password, telefono, puesto } = req.body;

    // Validar campos obligatorios
    if (!nombre || !email || !password) {
      return res.status(400).json({ message: "Nombre, email y password son obligatorios." });
    }

    // Crear el usuario con todos los campos
    const nuevo = await Usuario.create({
      nombre,
      email,
      password,
      telefono,
      puesto,
    });

    res.status(201).json(nuevo);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error al crear el usuario", error: error.message });
  }
};

exports.update = async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) return res.status(404).json({ message: 'No existe' });
  await usuario.update(req.body);
  res.json(usuario);
};

exports.remove = async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) return res.status(404).json({ message: 'No existe' });
  await usuario.destroy();
  res.json({ message: 'Eliminado correctamente' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ where: { email, password } });
  if (!usuario) return res.status(401).json({ message: 'Credenciales inválidas' });
  res.json({ usuario });
};

const db = require("../database/db");
//pendiente hacer una tabla solo para usuarios y otra para crear usuarios generales como en la contec

exports.create = (req, res) => {
  const { nombre, email, password, telefono, puesto } = req.body;

  // Validar datos
  if (!nombre || !email || !password) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }

  const query = `
    INSERT INTO usuarios (nombre, email, password, telefono, puesto)
    VALUES (?, ?, ?, ?, ?)
  `;
  
  db.query(query, [nombre, email, password, telefono || "", puesto || ""], (err, result) => {
    if (err) {
      console.error("Error al registrar usuario:", err);
      return res.status(500).json({ message: "Error en el servidor" });
    }
    res.status(201).json({ message: "Usuario registrado correctamente" });
  });
};

