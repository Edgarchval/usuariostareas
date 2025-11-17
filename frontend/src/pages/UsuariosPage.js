import React, { useState } from "react";

// Componentes de usuarios
import AgregarUsuario from "../components/Agregarusuario";
import MostrarUsuario from "../components/Mostrarusuarios";
import EditarUsuarios from "../components/Editarusuario";

// Componentes de tareas
import TareasPage from "./TareasPage";
import TareasListaGeneral from "../components/TareasListaGeneral";

import "../App.css";

function UsuariosPage() {
  const [selectedOption, setSelectedOption] = useState("listar");

  // Recargar completamente la vista principal
  const recargarPagina = () => {
    setSelectedOption("listar");
    window.location.reload();
  };

  // Render dinámico del contenido
  const renderContent = () => {
    switch (selectedOption) {
      // ------------------- USUARIOS -------------------
      case "agregar":
        return <AgregarUsuario />;

      case "listar":
        return <MostrarUsuario />;

      case "editar":
        return <EditarUsuarios />;

      // ------------------- TAREAS -------------------
      case "agregarTareaUsuario":
        return <TareasPage />;

      case "verTodasTareas":
        return <TareasListaGeneral />;

      // Default
      default:
        return <MostrarUsuario />;
    }
  };

  return (
    <div className="main-container">

      {/* -------------------- MENÚ LATERAL -------------------- */}
      <aside className="sidebar">

        <div className="menu-header">
          <button className="reload-btn" onClick={recargarPagina}>
            🔄
          </button>

          <button
            className="hamburger"
            onClick={() =>
              document.querySelector(".sidebar").classList.toggle("open")
            }
          >
            ☰
          </button>

          <h2>Usuarios</h2>
        </div>

        <ul className="menu">

          {/* ---------- OPCIONES DE USUARIOS ---------- */}
          <li onClick={() => setSelectedOption("agregar")}>
            ➕ Agregar usuario
          </li>

          <li onClick={() => setSelectedOption("editar")}>
            ✏️ Editar usuario
          </li>

          <hr />

          {/* ---------- OPCIONES DE TAREAS ---------- */}
          <h3 style={{ marginLeft: "10px" }}>📂 Tareas</h3>

          <li onClick={() => setSelectedOption("agregarTareaUsuario")}>
            📝 Agregar / Ver tareas por usuario
          </li>

          <li onClick={() => setSelectedOption("verTodasTareas")}>
            📋 Ver todas las tareas
          </li>

        </ul>
      </aside>

      {/* -------------------- CONTENIDO -------------------- */}
      <main className="content">{renderContent()}</main>
    </div>
  );
}

export default UsuariosPage;
