import React, { useEffect, useState } from "react";
import axios from "axios"; // Para hacer peticiones HTTP
import "../App.css";

const MostrarUsuario = () => {
  // Lista total de usuarios
  const [usuarios, setUsuarios] = useState([]);

  // Estado de carga para mostrar "Cargando..."
  const [loading, setLoading] = useState(true);

  // Texto ingresado en el buscador
  const [busqueda, setBusqueda] = useState("");

  // Usuario seleccionado para ver detalles
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  // Tareas asociadas al usuario seleccionado
  const [tareas, setTareas] = useState([]);


  // Se ejecuta una sola vez al montar el componente
  useEffect(() => {
    obtenerUsuarios();
  }, []);


  // Obtener los usuarios desde la API
  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/usuarios");
      setUsuarios(response.data); // Guardamos usuarios en el estado
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      setLoading(false); // Se quita el mensaje de carga
    }
  };


  // Obtener datos detallados del usuario + sus tareas
  const verDetalle = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/usuarios/${id}`);

      setUsuarioSeleccionado(res.data); // Guardamos el usuario completo
      setTareas(res.data.tareas || []); // Guardamos las tareas
    } catch (error) {
      console.error("Error al obtener detalle del usuario:", error);
    }
  };


  // Cerrar panel de detalle
  const cerrarDetalle = () => {
    setUsuarioSeleccionado(null);
    setTareas([]);
  };


  // Filtrado dinámico según nombre o puesto
  const usuariosFiltrados = usuarios.filter((u) =>
    `${u.nombre} ${u.puesto}`.toLowerCase().includes(busqueda.toLowerCase())
  );


  // Mientras carga, mostramos texto
  if (loading) return <p className="loading">Cargando usuarios...</p>;


  return (
    <div className="data-grid-container">
      <h2 className="titulo-seccion">📋 Usuarios Registrados</h2>

      {/* ---------------- BARRA DE BÚSQUEDA ---------------- */}
      <input
        type="text"
        placeholder="🔍 Buscar por nombre o puesto..."
        className="input-busqueda"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/* ---------------- TABLA: SOLO NOMBRE Y PUESTO ---------------- */}
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
                onClick={() => verDetalle(u.id)} // Al hacer click se abre el detalle
              >
                <td>{u.nombre}</td>
                <td>{u.puesto || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------- PANEL DE DETALLE ---------------- */}
      {usuarioSeleccionado && (
        <div className="detalle-overlay">
          <div className="detalle-card">

            {/* Botón para cerrar detalle */}
            <button className="cerrar-detalle" onClick={cerrarDetalle}>
              ✖ Cerrar
            </button>

            {/* Información general del usuario */}
            <h3>👤 Información del Usuario</h3>

            <p><strong>ID:</strong> {usuarioSeleccionado.id}</p>
            <p><strong>Nombre:</strong> {usuarioSeleccionado.nombre}</p>
            <p><strong>Email:</strong> {usuarioSeleccionado.email}</p>
            <p><strong>Teléfono:</strong> {usuarioSeleccionado.telefono || "—"}</p>
            <p><strong>Puesto:</strong> {usuarioSeleccionado.puesto || "—"}</p>

            {/* Contraseña oculta como asteriscos */}
            <p>
              <strong>Contraseña:</strong>{" "}
              {"*".repeat(usuarioSeleccionado.password?.length || 8)}
            </p>

            {/* ---------------- LISTADO DE TAREAS ---------------- */}
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
