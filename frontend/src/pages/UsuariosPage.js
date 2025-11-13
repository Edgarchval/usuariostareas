import React, { useState } from "react";
import AgregarUsuario from "../components/Agregarusuario";
import MostrarUsuario from "../components/Mostrarusuarios";

import "../App.css";

function UsuariosPage() {
  const [selectedOption, setSelectedOption] = useState("listar");

  const renderContent = () => {
    switch (selectedOption) {
      // --- Opciones de USUARIOS ---
      case "agregar":
        return <AgregarUsuario />;
      case "listar":
        return <MostrarUsuario />;
      case "editar":
        return <h3>✏️ Selecciona un usuario para editar</h3>;
      case "eliminar":
        return <h3>🗑️ Selecciona un usuario para eliminar</h3>;

      // --- Opciones de TAREAS ---
      case "agregarTarea":
        return <h3>📝 Crear nueva tarea</h3>;
      case "listarTareas":
        return <h3>📋 Mostrar tareas asignadas</h3>;
      case "editarTarea":
        return <h3>✏️ Selecciona una tarea para editar</h3>;
      case "eliminarTarea":
        return <h3>🗑️ Selecciona una tarea para eliminar</h3>;
      case "reasignarTarea":
        return <h3>🔄 Cambiar usuario asignado a la tarea</h3>;

      default:
        return <MostrarUsuario />;
    }
  };

  return (
    <div className="main-container">
      {/* Menú lateral */}
      <aside className="sidebar">
        <div className="menu-header">
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
          <li onClick={() => setSelectedOption("agregar")}>➕ Agregar usuario</li>
          <li onClick={() => setSelectedOption("listar")}>📋 Mostrar usuarios</li>
          <li onClick={() => setSelectedOption("editar")}>✏️ Editar usuario</li>
          <li onClick={() => setSelectedOption("eliminar")}>🗑️ Eliminar usuario</li>

          <hr />

          <h3 style={{ marginLeft: "10px" }}>📂 Tareas</h3>
          <li onClick={() => setSelectedOption("agregarTarea")}>➕ Crear tarea</li>
          <li onClick={() => setSelectedOption("listarTareas")}>📋 Mostrar tareas</li>
          <li onClick={() => setSelectedOption("editarTarea")}>✏️ Editar tarea</li>
          <li onClick={() => setSelectedOption("eliminarTarea")}>🗑️ Eliminar tarea</li>
          <li onClick={() => setSelectedOption("reasignarTarea")}>🔄 Reasignar tarea</li>
        </ul>
      </aside>

      {/* Contenido dinámico */}
      <main className="content">{renderContent()}</main>
    </div>
  );
}

export default UsuariosPage;
