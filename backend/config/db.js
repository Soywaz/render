// db.js
// ===============================
// CONEXIÓN A MYSQL Y AUTO-CREACIÓN (APTO PARA LOCAL Y NUBE)
// ===============================

import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "", // Contraseña de MySQL
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
};

const dbName = process.env.DB_NAME || "render";

// Función para inicializar base de datos y tablas antes de levantar el servidor
export const initDB = async () => {
  try {
    // Si estamos en local (localhost), intentamos crear la BD por si acaso
    if (dbConfig.host === "localhost") {
      const tempConn = await mysql.createConnection(dbConfig);
      await tempConn.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`);
      await tempConn.end();
    }
    
    // Conectar a la BD configurada para crear la tabla de usuarios
    const connWithDB = await mysql.createConnection({ ...dbConfig, database: dbName });
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
    console.log(`🟢 Base de datos '${dbName}' y tabla 'usuarios' verificadas/creadas con éxito.`);
  } catch (error) {
    console.error("🔴 Error inicializando la base de datos MySQL:", error.message);
    console.warn("⚠️ Si estás en producción, verifica que las variables de entorno de conexión sean correctas.");
  }
};

// Pool de conexiones principal
const pool = mysql.createPool({
  ...dbConfig,
  database: dbName,
});

export default pool;