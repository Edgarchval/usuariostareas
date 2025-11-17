const mysql = require("mysql2"); 
// Importamos el paquete mysql2 para manejar la conexión con MySQL

// Creamos la conexión utilizando variables de entorno (.env)
const db = mysql.createConnection({
  host: process.env.DB_HOST,      // Dirección del servidor MySQL
  user: process.env.DB_USER,      // Usuario de la base de datos
  password: process.env.DB_PASS,  // Contraseña del usuario
  database: process.env.DB_NAME,  // Nombre de la base de datos a usar
  port: process.env.DB_PORT || 3306 // Puerto (por defecto MySQL usa 3306)
});

// Intentamos establecer conexión
db.connect((err) => {
  if (err) {
    // Si ocurre un error, lo mostramos en consola
    console.error("❌ Error al conectar MySQL:", err);
    return;
  }

  // Si la conexión fue exitosa
  console.log("✅ MySQL Conectado");
});

// Exportamos la conexión para poder usarla en otros archivos
module.exports = db;
