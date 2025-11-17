import React, { useEffect, useState } from "react";
import { api } from "../Api";
import "../App.css";

const EditarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [usuarioEditado, setUsuarioEditado] = useState({});
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const res = await api.get("/usuarios");
      setUsuarios(res.data);
    } catch (e) {
      console.error("Error al obtener usuarios:", e);
    } finally {
      setLoading(false);
    }
  };

  const editar = (usuario) => {
    setEditandoId(usuario.id);
    setUsuarioEditado({
      ...usuario,
      password: "" // Campo agregado
    });
  };

  const cancelar = () => {
    setEditandoId(null);
    setUsuarioEditado({});
  };

  const guardar = async (id) => {
    try {
      const dataEnviar = { ...usuarioEditado };

      // Si password está vacío, no lo enviamos
      if (!dataEnviar.password || dataEnviar.password.trim() === "") {
        delete dataEnviar.password;
      }

      await api.put(`/usuarios/${id}`, dataEnviar);

      setUsuarios((prev) =>
        prev.map((u) => (u.id === id ? { ...u, ...usuarioEditado } : u))
      );

      setEditandoId(null);
      alert("Usuario actualizado correctamente.");
    } catch (err) {
      console.error("Error al actualizar usuario:", err);
      alert("Error al actualizar usuario.");
    }
  };

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario y sus tareas?")) return;

    try {
      await api.delete(`/usuarios/${id}`);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
      alert("Usuario eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("No se pudo eliminar el usuario.");
    }
  };

  const usuariosFiltrados = usuarios.filter((u) =>
    `${u.nombre} ${u.email} ${u.telefono} ${u.puesto}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  if (loading) return <p className="loading">Cargando usuarios...</p>;

  return (
    <div className="data-grid-container">
      <div className="header-usuarios">
        <h2 className="titulo-usuarios">MODIFICAR INFORMACION</h2>
      </div>

      <div className="buscador-contenedor">
        <input
          type="text"
          className="input-busqueda"
          placeholder="🔍 Buscar por nombre, email o puesto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="tabla-scroll">
        <table className="tabla-usuarios moderna">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Puesto</th>
              <th>Actualizar contraseña</th> {/* Nuevo */}
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {usuariosFiltrados.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>

                {/* Nombre */}
                <td>
                  {editandoId === u.id ? (
                    <input
                      type="text"
                      value={usuarioEditado.nombre}
                      onChange={(e) =>
                        setUsuarioEditado({ ...usuarioEditado, nombre: e.target.value })
                      }
                    />
                  ) : (
                    u.nombre
                  )}
                </td>

                {/* Email */}
                <td>
                  {editandoId === u.id ? (
                    <input
                      type="text"
                      value={usuarioEditado.email}
                      onChange={(e) =>
                        setUsuarioEditado({ ...usuarioEditado, email: e.target.value })
                      }
                    />
                  ) : (
                    u.email
                  )}
                </td>

                {/* Telefono */}
                <td>
                  {editandoId === u.id ? (
                    <input
                      type="text"
                      value={usuarioEditado.telefono}
                      onChange={(e) =>
                        setUsuarioEditado({ ...usuarioEditado, telefono: e.target.value })
                      }
                    />
                  ) : (
                    u.telefono
                  )}
                </td>

                {/* Puesto */}
                <td>
                  {editandoId === u.id ? (
                    <input
                      type="text"
                      value={usuarioEditado.puesto}
                      onChange={(e) =>
                        setUsuarioEditado({ ...usuarioEditado, puesto: e.target.value })
                      }
                    />
                  ) : (
                    u.puesto
                  )}
                </td>

                {/* 🔐 NUEVO CAMPO: Actualizar contraseña */}
                <td>
                  {editandoId === u.id ? (
                    <input
                      type="password"
                      placeholder="Nueva contraseña"
                      value={usuarioEditado.password}
                      onChange={(e) =>
                        setUsuarioEditado({ ...usuarioEditado, password: e.target.value })
                      }
                    />
                  ) : (
                    <span style={{ color: "#777" }}>••••••••</span> // No mostrar password real
                  )}
                </td>

                <td className="acciones-cell">
                  {editandoId === u.id ? (
                    <>
                      <button className="btn-guardar" onClick={() => guardar(u.id)}>
                        Guardar
                      </button>
                      <button className="btn-cancelar" onClick={cancelar}>
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn-editar" onClick={() => editar(u)}>
                        Editar
                      </button>
                      <button className="btn-eliminar" onClick={() => eliminarUsuario(u.id)}>
                        Eliminar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default EditarUsuarios;
