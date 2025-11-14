const db = require("../database/db");

// Crear tarea para un usuario
exports.createForUsuario = (req, res) => {
  const usuarioId = req.params.id;
  const { titulo, descripcion, estatus, fecha_entrega } = req.body;

  // Verificar que el usuario existe
  const checkUser = "SELECT * FROM usuarios WHERE id = ?";
  db.query(checkUser, [usuarioId], (err, rows) => {
    if (err) return res.status(500).json({ message: "Error en servidor" });

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const query = `
      INSERT INTO tareas (usuarioId, titulo, descripcion, estatus, fecha_entrega)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [usuarioId, titulo, descripcion, estatus || "pendiente", fecha_entrega || null],
      (err, result) => {
        if (err) return res.status(500).json({ message: "Error al crear tarea" });

        res.status(201).json({
          id: result.insertId,
          usuarioId,
          titulo,
          descripcion,
          estatus: estatus || "pendiente",
          fecha_entrega,
        });
      }
    );
  });
};

// Actualizar tarea
exports.update = (req, res) => {
  const tareaId = req.params.id;
  const { titulo, descripcion, estatus, fecha_entrega } = req.body;

  const query = `
    UPDATE tareas
    SET titulo = ?, descripcion = ?, estatus = ?, fecha_entrega = ?
    WHERE id = ?
  `;

  db.query(
    query,
    [titulo, descripcion, estatus, fecha_entrega, tareaId],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Error al actualizar tarea" });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Tarea no encontrada" });
      }

      res.json({ message: "Tarea actualizada correctamente" });
    }
  );
};

// Eliminar tarea
exports.remove = (req, res) => {
  const tareaId = req.params.id;

  const query = "DELETE FROM tareas WHERE id = ?";
  db.query(query, [tareaId], (err, result) => {
    if (err) return res.status(500).json({ message: "Error al eliminar tarea" });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.json({ message: "Tarea eliminada correctamente" });
  });
};
