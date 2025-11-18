const db = require("../database/db"); // Importamos la conexión MySQL

//---------------------------------------------------------
// OBTENER TODOS LOS USUARIOS
//---------------------------------------------------------
exports.getAll = (req, res) => {
  const query = "SELECT * FROM usuarios";

  // Ejecutamos la consulta
  db.query(query, (err, rows) => {
    if (err) {
      console.error("Error al obtener usuarios:", err);
      return res.status(500).json({ message: "Error en el servidor" });
    }

    // Enviamos todos los usuarios como JSON
    res.json(rows);
  });
};

//---------------------------------------------------------
// OBTENER UN USUARIO POR ID + SUS TAREAS (solo tareas NO completadas)
exports.getById = (req, res) => {
  const { id } = req.params;

  const queryUsuario = "SELECT * FROM usuarios WHERE id = ?";
  
  // ⛔ Ocultamos las tareas completadas
  const queryTareas = `
    SELECT * FROM tareas 
    WHERE usuarioId = ? 
    AND estatus != 'completada'
  `;

  // Obtener usuario
  db.query(queryUsuario, [id], (err, rows) => {
    if (err) {
      console.error("Error al obtener usuario:", err);
      return res.status(500).json({ message: "Error en el servidor" });
    }

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const usuario = rows[0];

    // Obtener tareas filtradas
    db.query(queryTareas, [id], (err2, tareasRows) => {
      if (err2) {
        console.error("Error al obtener tareas:", err2);
        return res.status(500).json({ message: "Error en el servidor" });
      }

      res.json({
        ...usuario,
        tareas: tareasRows
      });
    });
  });
};


//---------------------------------------------------------
// CREAR NUEVO USUARIO
//---------------------------------------------------------
exports.create = (req, res) => {
  const { nombre, email, password, telefono, puesto } = req.body;

  // Validación básica de datos requeridos
  if (!nombre || !email || !password) {
    return res
      .status(400)
      .json({ message: "Nombre, email y password son obligatorios." });
  }

  // Query de inserción
  const query = `
    INSERT INTO usuarios (nombre, email, password, telefono, puesto)
    VALUES (?, ?, ?, ?, ?)
  `;

  // Ejecutamos la inserción
  db.query(
    query,
    [nombre, email, password, telefono || "", puesto || ""],
    (err, result) => {
      if (err) {
        console.error("Error al registrar usuario:", err);
        return res.status(500).json({ message: "Error en el servidor" });
      }

      // Retornamos el usuario recién creado
      res.status(201).json({
        id: result.insertId,
        nombre,
        email,
        password,
        telefono,
        puesto,
      });
    }
  );
};

//---------------------------------------------------------
// ACTUALIZAR UN USUARIO
//---------------------------------------------------------
exports.update = (req, res) => {
  const { id } = req.params;
  let { nombre, email, password, telefono, puesto } = req.body;

  console.log("📥 BODY RECIBIDO:", req.body);

  // 1️⃣ Obtenemos el password actual si no se envió uno nuevo
  const getQuery = "SELECT password FROM usuarios WHERE id = ?";

  db.query(getQuery, [id], (err, rows) => {
    if (err) {
      console.log("❌ Error SELECT password:", err);
      return res.status(500).json({ message: "Error servidor" });
    }

    // Si el usuario no existe
    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // 2️⃣ Si password está vacío o no viene → mantener el actual
    if (!password || (typeof password === "string" && password.trim() === "")) {
      password = rows[0].password;
    }

    // 3️⃣ Query de actualización
    const updateQuery = `
      UPDATE usuarios
      SET nombre=?, email=?, password=?, telefono=?, puesto=?
      WHERE id=?
    `;

    // Ejecutar actualización
    db.query(
      updateQuery,
      [nombre, email, password, telefono || "", puesto || "", id],
      (err2, result) => {
        console.log("⚠ ERROR SQL:", err2); // Mostramos error real

        if (err2) {
          // Error si el email ya existe
          if (err2.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ message: "El email ya está registrado" });
          }
          return res.status(500).json({ message: "Error interno" });
        }

        // Modificación exitosa
        res.json({ id, nombre, email, telefono, puesto });
      }
    );
  });
};

//---------------------------------------------------------
// ELIMINAR UN USUARIO POR ID
//---------------------------------------------------------
exports.remove = (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM usuarios WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar usuario:", err);
      return res.status(500).json({ message: "Error en el servidor" });
    }

    // Si no existía ese ID
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No existe usuario con ese id" });
    }

    res.json({ message: "Eliminado correctamente" });
  });
};

//LOGIN 
exports.login = (req, res) => {
  const { email, password } = req.body;

  const query =
    "SELECT * FROM usuarios WHERE email = ? AND password = ? LIMIT 1";

  db.query(query, [email, password], (err, rows) => {
    if (err) {
      console.error("Error en login:", err);
      return res.status(500).json({ message: "Error en el servidor" });
    }

    if (rows.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    res.json({ usuario: rows[0] });
  });
};


