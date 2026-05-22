// App.jsx - Componente raíz de la aplicación
// Configura el enrutamiento para Inicio, Acerca de y Registro

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Inicio from "./pages/inicio/Inicio";
import Acerca from "./pages/acerca/Acerca";
import Registro from "./pages/registro/Registro";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/acerca" element={<Acerca />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;