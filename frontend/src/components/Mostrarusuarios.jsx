import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const MostrarUsuario = ({ onEdit }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      await axios.delete(`http://localhost:4000/api/usuarios/${id}`);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
      alert("✅ Usuario eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("❌ No se pudo eliminar el usuario");
    }
  };

  if (loading) return <p className="loading">Cargando usuarios...</p>;

  return (
    <div className="data-grid-container">
      <h2 className="titulo-seccion">📋 Usuarios Registrados</h2>

      {usuarios.length === 0 ? (
        <p className="no-datos">No hay usuarios registrados.</p>
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
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.nombre}</td>
                  <td>{u.email}</td>
                  <td>{u.telefono || "—"}</td>
                  <td>{u.puesto || "—"}</td>
                  <td className="password-cell">{u.password}</td>
                  <td className="acciones">
                    <button
                      className="btn-editar"
                      onClick={() => onEdit && onEdit(u)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() => handleDelete(u.id)}
                    >
                      🗑️ Eliminar
                    </button>
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
