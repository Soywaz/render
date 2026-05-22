// Acerca.jsx - Página "Acerca de" de Render
import React from "react";
import "./Acerca.css";

const Acerca = () => {
  return (
    <main className="acerca-container animate-fade-in">
      <section className="acerca-hero">
        <h1 className="acerca-title">
          Acerca de <span className="text-gradient">Render</span>
        </h1>
        <p className="acerca-intro">
          Render es un proyecto demostrativo diseñado para ilustrar la integración fluida de tecnologías modernas de desarrollo web (Frontend, Backend y Base de Datos) en un flujo de trabajo ágil y robusto.
        </p>
      </section>

      <section className="tech-stack-section">
        <h2>Nuestra Arquitectura</h2>
        <div className="tech-grid">
          <div className="glass-card tech-card">
            <div className="tech-badge react">Vite + React</div>
            <p>La interfaz de usuario está construida sobre React, aprovechando el renderizado rápido de componentes y el enrutamiento dinámico en el cliente con React Router. Todo gestionado con Vite para tiempos de compilación casi instantáneos.</p>
          </div>

          <div className="glass-card tech-card">
            <div className="tech-badge node">Node.js + Express</div>
            <p>El backend se implementa con Node.js y el framework Express. Proporciona una API RESTful ligera que expone rutas seguras de registro y consulta de datos en formato JSON, integrando middlewares CORS y JSON parse.</p>
          </div>

          <div className="glass-card tech-card">
            <div className="tech-badge mysql">MySQL Database</div>
            <p>La capa de almacenamiento utiliza MySQL. El backend interactúa directamente con el motor de base de datos a través de pools de conexión optimizados (usando mysql2), aprovisionando la estructura relacional de forma automatizada al arrancar.</p>
          </div>
        </div>
      </section>

      <section className="glass-card info-card">
        <h3>Propósito del Proyecto</h3>
        <p>
          El principal objetivo de Render es demostrar cómo se pueden conectar componentes de forma limpia, estructurada y visualmente atractiva sin complejidad innecesaria. Es un punto de partida perfecto para aplicaciones de registro y sistemas de administración simples.
        </p>
      </section>
    </main>
  );
};

export default Acerca;
