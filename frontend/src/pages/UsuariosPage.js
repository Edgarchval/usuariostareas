import React, { useState } from "react";
import UsuarioList from "../components/UsuarioList";
import Agregarusuario from "../components/Agregarusuario";
import TareaList from "../components/TareaList";
import TareaForm from "../components/TareaForm";

import "../App.css";

function UsuariosPage() {
  const [selectedOption, setSelectedOption] = useState("listar");

  const renderContent = () => {
    switch (selectedOption) {
      // --- Opciones de USUARIOS ---
      case "agregarUsuario":
        return <Agregarusuario />;
      case "listarUsuarios":
        return <UsuarioList />;
      case "editarUsuario":
        return <h3>✏️ Selecciona un usuario para editar</h3>;
      case "eliminarUsuario":
        return <h3>🗑️ Selecciona un usuario para eliminar</h3>;

      // --- Opciones de TAREAS ---
      case "agregarTarea":
        return <TareaForm />;
      case "listarTareas":
        return <TareaList />;
      case "editarTarea":
        return <h3>✏️ Selecciona una tarea para editar</h3>;
      case "eliminarTarea":
        return <h3>🗑️ Selecciona una tarea para eliminar</h3>;
      case "reasignarTarea":
        return <h3>🔄 Cambiar usuario asignado a la tarea</h3>;

      default:
        return <UsuarioList />;
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
          <h2>Panel de Control</h2>
        </div>

        <ul className="menu">
          <h3>👤 Usuarios</h3>
          <li onClick={() => setSelectedOption("agregarUsuario")}>
            ➕ Agregar usuario
          </li>
          <li onClick={() => setSelectedOption("listarUsuarios")}>
            📋 Mostrar usuarios
          </li>
          <li onClick={() => setSelectedOption("editarUsuario")}>
            ✏️ Editar usuario
          </li>
          <li onClick={() => setSelectedOption("eliminarUsuario")}>
            🗑️ Eliminar usuario
          </li>

          <hr />

          <h3>🧾 Tareas</h3>
          <li onClick={() => setSelectedOption("agregarTarea")}>
            ➕ Crear tarea
          </li>
          <li onClick={() => setSelectedOption("listarTareas")}>
            📋 Mostrar tareas
          </li>
          <li onClick={() => setSelectedOption("editarTarea")}>
            ✏️ Modificar tarea
          </li>
          <li onClick={() => setSelectedOption("eliminarTarea")}>
            🗑️ Eliminar tarea
          </li>
          <li onClick={() => setSelectedOption("reasignarTarea")}>
            🔄 Cambiar usuario asignado
          </li>
        </ul>
      </aside>

      {/* Contenido dinámico */}
      <main className="content">{renderContent()}</main>
    </div>
  );
}

export default UsuariosPage;
