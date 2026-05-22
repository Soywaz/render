// server.js
// ===============================
// CONFIGURACIÓN DEL SERVIDOR EXPRESS
// ===============================

import express from "express";
import cors from "cors";

// Importamos la inicialización de la BD y rutas
import { initDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// ===============================
// MIDDLEWARES
// ===============================

// Permite recibir JSON desde el frontend
app.use(express.json());

// Permite conexión entre frontend (Vite) y backend
app.use(cors());

// ===============================
// RUTAS
// ===============================

app.use("/api/auth", authRoutes);

// ===============================
// INICIALIZACIÓN Y LEVANTAR SERVIDOR
// ===============================

const PORT = 3000;

// Inicializar la base de datos e iniciar el servidor
await initDB();

app.listen(PORT, () => {
    console.log(`🟢 Servidor corriendo en http://localhost:${PORT}`);
});