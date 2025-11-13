// src/components/UsuarioList.jsx
import React, { useEffect, useState } from "react";

function UsuarioList() {
  const [usuarios, setUsuarios] = useState([]); // Inicializar como arreglo vacío
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Llama a tu API o backend para obtener usuarios
    fetch("http://localhost:3000/api/usuarios")
      .then((res) => res.json())
      .then((data) => {
        setUsuarios(Array.isArray(data) ? data : []); // Validar que sea un arreglo
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener usuarios:", error);
        setUsuarios([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;

  if (!usuarios || usuarios.length === 0)
    return <p>No hay usuarios registrados.</p>;

  return (
    <div className="usuarios-container">
      <h2>Lista de Usuarios</h2>
      <table className="tabla-usuarios">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.correo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsuarioList;
