// db.js
// ===============================
// CONEXIÓN A MYSQL Y AUTO-CREACIÓN
// ===============================

import mysql from "mysql2/promise";

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "", // Contraseña de MySQL (vía por defecto para XAMPP/WAMP es vacía)
};

// Función para inicializar base de datos y tablas antes de levantar el servidor
export const initDB = async () => {
  try {
    // 1. Conexión temporal para crear la BD si no existe
    const tempConn = await mysql.createConnection(dbConfig);
    await tempConn.query("CREATE DATABASE IF NOT EXISTS render;");
    await tempConn.end();
    
    // 2. Conectar a la BD 'render' para crear la tabla de usuarios
    const connWithDB = await mysql.createConnection({ ...dbConfig, database: "render" });
    await connWithDB.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        correo VARCHAR(255) NOT NULL UNIQUE,
        telefono VARCHAR(50) NOT NULL,
        creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    await connWithDB.end();
    console.log("🟢 Base de datos 'render' y tabla 'usuarios' verificadas/creadas con éxito.");
  } catch (error) {
    console.error("🔴 Error inicializando la base de datos MySQL:", error.message);
    console.warn("⚠️ Asegúrate de que tu servidor MySQL local esté corriendo en el puerto 3306 y el usuario root no tenga contraseña (o edita backend/config/db.js).");
  }
};

// Pool de conexiones principal
const pool = mysql.createPool({
  ...dbConfig,
  database: "render",
});

export default pool;