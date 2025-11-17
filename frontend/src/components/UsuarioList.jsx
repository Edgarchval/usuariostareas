// src/components/UsuarioList.jsx
import React, { useEffect, useState } from "react";

function UsuarioList() {

  // Estado para almacenar usuarios obtenidos del backend
  const [usuarios, setUsuarios] = useState([]); // Inicia como arreglo vacío

  // Estado para mostrar mensaje de carga mientras se obtiene la información
  const [loading, setLoading] = useState(true);


  // useEffect se ejecuta al montar el componente
  useEffect(() => {
    // Llamada al backend
    fetch("http://localhost:3000/api/usuarios")
      .then((res) => res.json()) // Convertimos la respuesta a JSON
      .then((data) => {
        // Validamos que el backend haya devuelto un arreglo
        setUsuarios(Array.isArray(data) ? data : []);

        setLoading(false); // Quitamos mensaje de carga
      })
      .catch((error) => {
        console.error("Error al obtener usuarios:", error);

        // Si hay error, devolvemos arreglo vacío
        setUsuarios([]);

        setLoading(false);
      });
  }, []); // [] = solo se ejecuta 1 vez al cargar


  // Mostrar mensaje mientras se cargan los usuarios
  if (loading) return <p>Cargando usuarios...</p>;

  // Si ya cargó pero no hay usuarios, mostramos mensaje
  if (!usuarios || usuarios.length === 0)
    return <p>No hay usuarios registrados.</p>;


  return (
    <div className="usuarios-container">
      <h2>Lista de Usuarios</h2>

      {/* Tabla con los usuarios */}
      <table className="tabla-usuarios">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
          </tr>
        </thead>

        <tbody>
          {/* Recorremos usuarios y mostramos cada fila */}
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
