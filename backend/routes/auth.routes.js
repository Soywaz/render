// auth.routes.js
// ===============================
// CONTROLADOR Y RUTAS DE USUARIOS
// ===============================

import { Router } from "express";
import pool from "../config/db.js";

const router = Router();

// ===============================
// REGISTRO DE USUARIO
// ===============================
router.post("/register", async (req, res) => {
  const { nombre, correo, telefono } = req.body;

  try {
    // Validación básica de campos vacíos
    if (!nombre || !correo || !telefono) {
      return res.status(400).json({
        message: "Todos los campos (nombre, correo, teléfono) son obligatorios",
      });
    }

    // Validación sencilla de formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return res.status(400).json({
        message: "El formato de correo electrónico no es válido",
      });
    }

    // Verificar si el correo ya está registrado
    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE correo = ?",
      [correo]
    );

    if (rows.length > 0) {
      return res.status(400).json({
        message: "El correo electrónico ya se encuentra registrado",
      });
    }

    // Insertar el nuevo usuario en la base de datos 'render'
    await pool.query(
      "INSERT INTO usuarios (nombre, correo, telefono) VALUES (?, ?, ?)",
      [nombre, correo, telefono]
    );

    res.status(201).json({
      message: "¡Usuario registrado exitosamente en MySQL!",
    });
  } catch (error) {
    console.error("Error en /register:", error);
    res.status(500).json({
      message: "Error en el servidor al intentar registrar el usuario",
    });
  }
});

// ===============================
// LISTAR USUARIOS REGISTRADOS
// ===============================
router.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, nombre, correo, telefono, creado_en FROM usuarios ORDER BY creado_en DESC"
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error en /users:", error);
    res.status(500).json({
      message: "Error en el servidor al obtener la lista de usuarios",
    });
  }
});

export default router;