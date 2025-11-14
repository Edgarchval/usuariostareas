import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const MostrarUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/usuarios");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  // Obtener info detallada + tareas
  const verDetalle = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/usuarios/${id}`);
      setUsuarioSeleccionado(res.data);
      setTareas(res.data.tareas || []);
    } catch (error) {
      console.error("Error al obtener detalle del usuario:", error);
    }
  };

  const cerrarDetalle = () => {
    setUsuarioSeleccionado(null);
    setTareas([]);
  };

  // Filtrado dinámico por nombre y puesto
  const usuariosFiltrados = usuarios.filter((u) =>
    `${u.nombre} ${u.puesto}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (loading) return <p className="loading">Cargando usuarios...</p>;

  return (
    <div className="data-grid-container">
      <h2 className="titulo-seccion">📋 Usuarios Registrados</h2>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="🔍 Buscar por nombre o puesto..."
        className="input-busqueda"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/* Tabla SOLO nombre y puesto */}
      <div className="tabla-scroll">
        <table className="tabla-usuarios moderna">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Puesto</th>
            </tr>
          </thead>

          <tbody>
            {usuariosFiltrados.map((u) => (
              <tr
                key={u.id}
                className="fila-click"
                onClick={() => verDetalle(u.id)}
              >
                <td>{u.nombre}</td>
                <td>{u.puesto || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PANEL DE DETALLE */}
      {usuarioSeleccionado && (
        <div className="detalle-overlay">
          <div className="detalle-card">
            <button className="cerrar-detalle" onClick={cerrarDetalle}>
              ✖ Cerrar
            </button>

            <h3>👤 Información del Usuario</h3>

            <p><strong>ID:</strong> {usuarioSeleccionado.id}</p>
            <p><strong>Nombre:</strong> {usuarioSeleccionado.nombre}</p>
            <p><strong>Email:</strong> {usuarioSeleccionado.email}</p>
            <p><strong>Teléfono:</strong> {usuarioSeleccionado.telefono || "—"}</p>
            <p><strong>Puesto:</strong> {usuarioSeleccionado.puesto || "—"}</p>
            <p>
              <strong>Contraseña:</strong>{" "}
              {"*".repeat(usuarioSeleccionado.password?.length || 8)}
            </p>

            <h3>📝 Tareas asignadas</h3>

            {tareas.length === 0 ? (
              <p>No tiene tareas asignadas.</p>
            ) : (
              <ul>
                {tareas.map((t) => (
                  <li key={t.id}>
                    <strong>{t.titulo}</strong> – {t.descripcion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MostrarUsuario;
