// Registro.jsx - Página de Registro de Usuarios
import React, { useState, useEffect } from "react";
import "./Registro.css";

const Registro = () => {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");

  // Estados para control de envío y mensajes
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" }); // type: 'success' | 'error'
  
  // Estado para la lista de usuarios registrados
  const [users, setUsers] = useState([]);

  // Cargar usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para obtener usuarios del backend
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ text: "", type: "" });

    // Validaciones del lado del cliente
    if (!nombre.trim() || !correo.trim() || !telefono.trim()) {
      setMsg({ text: "Todos los campos son requeridos", type: "error" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      setMsg({ text: "El formato de correo no es válido", type: "error" });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, correo, telefono }),
      });

      const data = await response.json();

      if (response.ok) {
        setMsg({ text: data.message, type: "success" });
        // Limpiar formulario
        setNombre("");
        setCorreo("");
        setTelefono("");
        // Actualizar la lista en tiempo real
        fetchUsers();
      } else {
        setMsg({ text: data.message || "Error al registrar", type: "error" });
      }
    } catch (error) {
      console.error("Error en registro:", error);
      setMsg({
        text: "No se pudo conectar con el servidor. Asegúrate de que el backend esté corriendo.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="registro-container animate-fade-in">
      <div className="registro-grid">
        {/* Formulario */}
        <section className="glass-card form-section">
          <h2>Registro de Usuario</h2>
          <p className="form-subtitle">Ingresa los datos para guardarlos en MySQL</p>

          {msg.text && (
            <div className={`alert-box alert-${msg.type}`}>
              {msg.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="register-form">
            <div className="input-group">
              <label htmlFor="nombre">Nombre Completo</label>
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Wilmar Alexander Zap"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="correo">Correo Electrónico</label>
              <input
                id="correo"
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="Ej. correo@ejemplo.com"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="telefono">Número de Teléfono</label>
              <input
                id="telefono"
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Ej. +57 300 123 4567"
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Registrando..." : "Registrar Usuario"}
            </button>
          </form>
        </section>

        {/* Lista de Registrados */}
        <section className="glass-card list-section">
          <h2>Usuarios Registrados (DB: render)</h2>
          <p className="list-subtitle">Consulta de la tabla `usuarios` en tiempo real</p>

          <div className="users-list-container">
            {users.length === 0 ? (
              <div className="no-users">
                <span className="no-users-icon">👥</span>
                <p>No hay usuarios registrados aún.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Correo</th>
                      <th>Teléfono</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="user-name">{user.nombre}</td>
                        <td className="user-email">{user.correo}</td>
                        <td className="user-phone">{user.telefono}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Registro;
