import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const MostrarUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");

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

  // Filtrado dinámico
  const usuariosFiltrados = usuarios.filter((u) =>
    `${u.nombre} ${u.email} ${u.puesto}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  if (loading) return <p className="loading">Cargando usuarios...</p>;

  return (
    <div className="data-grid-container">
      <h2 className="titulo-seccion">📋 Usuarios Registrados</h2>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="🔍 Buscar por nombre, email o puesto..."
        className="input-busqueda"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {usuariosFiltrados.length === 0 ? (
        <p className="no-datos">No hay usuarios que coincidan con la búsqueda.</p>
      ) : (
        <div className="tabla-scroll">
          <table className="tabla-usuarios">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Puesto</th>
                <th>Contraseña</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.nombre}</td>
                  <td>{u.email}</td>
                  <td>{u.telefono || "—"}</td>
                  <td>{u.puesto || "—"}</td>
                  {/* Mostrar contraseña en asteriscos */}
                  <td className="password-cell">
                    {"*".repeat(u.password?.length || 8)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MostrarUsuario;
