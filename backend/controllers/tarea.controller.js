// controllers/tarea.controller.js
const db = require("../database/db");

// ------------------------------------------------------
// Crear una tarea asociada a un usuario
// POST /api/usuarios/:id/tareas
// ------------------------------------------------------
exports.createForUsuario = (req, res) => {
  const usuarioId = req.params.id;
  const { titulo, descripcion, estatus, fecha_entrega } = req.body;

  if (!titulo) {
    return res.status(400).json({ message: "El título es obligatorio" });
  }

  const query = `
    INSERT INTO tareas (usuarioId, titulo, descripcion, estatus, fecha_entrega)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [usuarioId, titulo, descripcion || null, estatus || "pendiente", fecha_entrega || null],
    (err, result) => {
      if (err) {
        console.error("Error al insertar tarea:", err);
        return res.status(500).json({ message: "Error al crear tarea" });
      }

      // Devolvemos la tarea recién creada
      res.status(201).json({
        id: result.insertId,
        usuarioId,
        titulo,
        descripcion,
        estatus: estatus || "pendiente",
        fecha_entrega: fecha_entrega || null
      });
    }
  );
};

// ------------------------------------------------------
// Actualizar tarea
// PUT /api/tareas/:id
// ------------------------------------------------------
exports.update = (req, res) => {
  const id = req.params.id;
  const { titulo, descripcion, estatus, fecha_entrega, usuarioId } = req.body;

  const query = `
    UPDATE tareas
    SET titulo = ?, descripcion = ?, estatus = ?, fecha_entrega = ?, usuarioId = ?
    WHERE id = ?
  `;

  db.query(
    query,
    [titulo, descripcion, estatus, fecha_entrega, usuarioId, id],
    (err) => {
      if (err) {
        console.error("Error al actualizar tarea:", err);
        return res.status(500).json({ message: "Error al actualizar tarea" });
      }
      res.json({ message: "Tarea actualizada correctamente" });
    }
  );
};

// ------------------------------------------------------
// Eliminar tarea
// DELETE /api/tareas/:id
// ------------------------------------------------------
exports.remove = (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM tareas WHERE id = ?";

  db.query(query, [id], (err) => {
    if (err) {
      console.error("Error al eliminar tarea:", err);
      return res.status(500).json({ message: "Error al eliminar tarea" });
    }
    res.json({ message: "Tarea eliminada correctamente" });
  });
};



exports.getAll = (req, res) => {
  const sql = `
    SELECT t.*, u.nombre AS usuarioNombre
    FROM tareas t
    INNER JOIN usuarios u ON u.id = t.usuarioId
    ORDER BY t.id DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ message: 'Error DB', error: err });

    res.json(rows);
  });
};
