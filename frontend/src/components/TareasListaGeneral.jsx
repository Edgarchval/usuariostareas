import { useEffect, useState } from "react";
import { api } from "../Api";
import "../App.css";

function TareasListaGeneral() {
  const [tareasPendientes, setTareasPendientes] = useState([]);
  const [tareasCompletadas, setTareasCompletadas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(null);

  // ================================
  // CARGAR DATOS
  // ================================
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const resT = await api.get("/tareas");
      const resU = await api.get("/usuarios");

      setUsuarios(resU.data);
      setTareasPendientes(resT.data.filter(t => t.estatus !== "completada"));
      setTareasCompletadas(resT.data.filter(t => t.estatus === "completada"));
    } catch (error) {
      console.error(error);
    }
  };

  // ================================
  // ABRIR EDICIÓN
  // ================================
  const abrirEdicion = (t) => {
    setEditando({
      ...t,
      usuarioId: Number(t.usuarioId),
      fecha_entrega: t.fecha_entrega?.substring(0, 10)
    });
  };

  const cancelarEdicion = () => setEditando(null);

  const guardarEdicion = async () => {
    try {
      await api.put(`/tareas/${editando.id}`, editando);
      setEditando(null);
      cargarDatos();
    } catch (e) {
      alert("Error al actualizar tarea");
    }
  };

  const cambiarValor = (e) => {
    setEditando({
      ...editando,
      [e.target.name]:
        e.target.name === "usuarioId" ? Number(e.target.value) : e.target.value
    });
  };

  // ================================
  // ELIMINAR
  // ================================
  const eliminarTarea = async (id) => {
    if (!window.confirm("¿Eliminar tarea?")) return;

    try {
      await api.delete(`/tareas/${id}`);
      cargarDatos();
    } catch (e) {
      alert("Error al eliminar");
    }
  };

  return (
    <div className="data-grid-container">

      {/* ====================== TÍTULO PRINCIPAL ====================== */}
      <h2 className="titulo-seccion">📋 Tareas Pendientes / En Progreso</h2>

      {/* ====================== TABLA DE TAREAS PENDIENTES ====================== */}
      <div className="tabla-scroll">
        <table className="tabla-usuarios moderna">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Estatus</th>
              <th>Entrega</th>
              <th>Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {tareasPendientes.map(t => {
              const edit = editando && editando.id === t.id;

              return (
                <tr key={t.id}>
                  <td>{t.id}</td>

                  <td>
                    {edit ? (
                      <input
                        className="form-input"
                        name="titulo"
                        value={editando.titulo}
                        onChange={cambiarValor}
                      />
                    ) : (
                      t.titulo
                    )}
                  </td>

                  <td>
                    {edit ? (
                      <textarea
                        className="form-input"
                        name="descripcion"
                        value={editando.descripcion}
                        onChange={cambiarValor}
                      />
                    ) : (
                      t.descripcion
                    )}
                  </td>

                  <td>
                    {edit ? (
                      <select
                        className="form-input"
                        name="estatus"
                        value={editando.estatus}
                        onChange={cambiarValor}
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="en_progreso">En progreso</option>
                        <option value="completada">Completada</option>
                      </select>
                    ) : (
                      t.estatus
                    )}
                  </td>

                  <td>
                    {edit ? (
                      <input
                        type="date"
                        className="form-input"
                        name="fecha_entrega"
                        value={editando.fecha_entrega}
                        onChange={cambiarValor}
                      />
                    ) : (
                      t.fecha_entrega?.substring(0, 10)
                    )}
                  </td>

                  <td>
                    {edit ? (
                      <select
                        className="form-input"
                        name="usuarioId"
                        value={editando.usuarioId}
                        onChange={cambiarValor}
                      >
                        {usuarios.map(u => (
                          <option key={u.id} value={u.id}>
                            {u.nombre}
                          </option>
                        ))}
                      </select>
                    ) : (
                      t.usuarioNombre
                    )}
                  </td>

                  <td>
                    {edit ? (
                      <>
                        <button className="btn-guardar" onClick={guardarEdicion}>
                          Guardar
                        </button>
                        <button className="btn-cancelar" onClick={cancelarEdicion}>
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="btn-editar" onClick={() => abrirEdicion(t)}>
                          Editar
                        </button>
                        <button
                          className="btn-eliminar"
                          onClick={() => eliminarTarea(t.id)}
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ====================== TAREAS COMPLETADAS ====================== */}
      <h2 className="titulo-seccion" style={{ marginTop: 60 }}>
        ✔ Tareas Completadas
      </h2>

      <div className="tabla-scroll">
        <table className="tabla-usuarios moderna">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Entrega</th>
              <th>Usuario</th>
            </tr>
          </thead>

          <tbody>
            {tareasCompletadas.map(t => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.titulo}</td>
                <td>{t.descripcion}</td>
                <td>{t.fecha_entrega?.substring(0, 10)}</td>
                <td>{t.usuarioNombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TareasListaGeneral;
