// Inicio.jsx - Página de bienvenida de Render
import React from "react";
import { Link } from "react-router-dom";
import "./Inicio.css";

const Inicio = () => {
  return (
    <main className="inicio-container animate-fade-in">
      {/* Sección Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">Tecnología de Vanguardia</span>
          <h1 className="hero-title">
            Diseña el Futuro con <span className="text-gradient-cyan">Render</span>
          </h1>
          <p className="hero-subtitle">
            Una plataforma ultra-sencilla y de alto rendimiento que conecta tus interfaces en React con bases de datos en tiempo real.
          </p>
          <div className="hero-actions">
            <Link to="/registro" className="btn btn-primary">
              Comenzar Registro
            </Link>
            <Link to="/acerca" className="btn btn-secondary">
              Saber Más
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="glow-sphere sphere-1"></div>
          <div className="glow-sphere sphere-2"></div>
        </div>
      </section>

      {/* Sección de Tarjetas de Características */}
      <section className="features-section">
        <div className="features-grid">
          <div className="glass-card feature-card">
            <div className="feature-icon">⚡</div>
            <h3>React + Vite</h3>
            <p>Estructura de frontend moderna con carga ultra rápida gracias al empaquetador de nueva generación Vite.</p>
          </div>

          <div className="glass-card feature-card">
            <div className="feature-icon">⚙️</div>
            <h3>Express Backend</h3>
            <p>API REST construida con Express y Node.js para un manejo eficiente de peticiones y base de datos limpia.</p>
          </div>

          <div className="glass-card feature-card">
            <div className="feature-icon">🗄️</div>
            <h3>MySQL Database</h3>
            <p>Persistencia relacional confiable para registrar nombres, correos y teléfonos en tu base de datos de escritorio.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Inicio;