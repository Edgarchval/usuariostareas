import { useEffect, useState } from "react";
import { api } from "../Api";
import "../App.css";

function TareasPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSel, setUsuarioSel] = useState(null);

  const [vista, setVista] = useState("agregar"); // 👈 Solo 2 vistas

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    estatus: "pendiente",
    fecha_entrega: "",
  });

  const [tareas, setTareas] = useState([]);
  const [tareaEditando, setTareaEditando] = useState(null);

  // ================================
  // CARGAR USUARIOS
  // ================================
  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const res = await api.get("/usuarios");
        setUsuarios(res.data);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };
    cargarUsuarios();
  }, []);

  // ================================
  // SELECCIONAR USUARIO
  // ================================
  const seleccionarUsuario = async (id) => {
    if (!id) return;

    try {
      const res = await api.get(`/usuarios/${id}`);

      setUsuarioSel({
        id: res.data.id,
        nombre: res.data.nombre,
        puesto: res.data.puesto,
        email: res.data.email,
      });

      setTareas(res.data.tareas || []);
      setTareaEditando(null);
    } catch (error) {
      console.error("Error al cargar usuario:", error);
    }
  };

  // ================================
  // FORM NUEVA TAREA
  // ================================
  const handleChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const guardarTarea = async (e) => {
    e.preventDefault();

    if (!usuarioSel) {
      alert("Selecciona un usuario primero.");
      return;
    }

    // ================================
    // VALIDACIONES
    // ================================
    if (!form.titulo.trim()) {
      alert("El campo Título es obligatorio.");
      return;
    }

    if (!form.descripcion.trim()) {
      alert("El campo Descripción es obligatorio.");
      return;
    }

    if (!form.estatus.trim()) {
      alert("Debes seleccionar un estatus.");
      return;
    }

    if (!form.fecha_entrega.trim()) {
      alert("Debes seleccionar la fecha de entrega.");
      return;
    }

    try {
      const res = await api.post(`/usuarios/${usuarioSel.id}/tareas`, form);

      setTareas((prev) => [...prev, res.data]);

      setForm({
        titulo: "",
        descripcion: "",
        estatus: "pendiente",
        fecha_entrega: "",
      });

      alert("Tarea agregada correctamente");
    } catch (error) {
      console.error("Error al crear tarea:", error.response || error);
      alert("No se pudo crear la tarea.");
    }
  };

  // ================================
  // EDICIÓN
  // ================================
  const empezarEdicion = (t) => setTareaEditando({ ...t });
  const cancelarEdicion = () => setTareaEditando(null);

  const handleChangeEdicion = (e) => {
    const { name, value } = e.target;
    setTareaEditando((prev) => ({
      ...prev,
      [name]: name === "usuarioId" ? Number(value) : value,
    }));
  };

  const guardarEdicion = async () => {
    try {
      await api.put(`/tareas/${tareaEditando.id}`, tareaEditando);

      setTareas((prev) =>
        prev.map((t) =>
          t.id === tareaEditando.id ? { ...tareaEditando } : t
        )
      );

      setTareaEditando(null);
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
      alert("No se pudo actualizar.");
    }
  };

  // ================================
  // ELIMINAR
  // ================================
  const eliminarTarea = async (id) => {
    if (!window.confirm("¿Eliminar tarea?")) return;

    try {
      await api.delete(`/tareas/${id}`);
      setTareas((prev) => prev.filter((t) => t.id !== id));
      if (tareaEditando?.id === id) setTareaEditando(null);
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  const obtenerNombreUsuario = (usuarioId) => {
    const u = usuarios.find((u) => u.id === usuarioId);
    return u ? u.nombre : `ID ${usuarioId}`;
  };

  // ======================================================
  // RETURN (UI)
  // ======================================================
  return (
    <div className="tareas-container">

      {/* ================= MENU SOLO 2 OPCIONES ================= */}
      <div className="tareas-menu">
        <button
          className={`menu-btn ${vista === "agregar" ? "activo" : ""}`}
          onClick={() => setVista("agregar")}
        >
          Agregar tarea
        </button>

        <button
          className={`menu-btn ${vista === "ver" ? "activo" : ""}`}
          disabled={!usuarioSel}
          onClick={() => setVista("ver")}
        >
          Ver tareas
        </button>
      </div>

      {/* =============== VISTA AGREGAR =============== */}
      {vista === "agregar" && (
        <div className="form-card grande">
          <h2 className="form-title">Agregar Nueva Tarea</h2>

          {/* SELECT USUARIO */}
          <div className="form-group">
            <label>Seleccionar Usuario:</label>
            <select
              className="form-input"
              defaultValue=""
              onChange={(e) => seleccionarUsuario(e.target.value)}
            >
              <option value="">-- Selecciona un usuario --</option>
              {usuarios.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* INFO DEL USUARIO */}
          {usuarioSel && (
            <div className="info-usuario-box">
              <div><strong>ID:</strong> {usuarioSel.id}</div>
              <div><strong>Nombre:</strong> {usuarioSel.nombre}</div>
              <div><strong>Puesto:</strong> {usuarioSel.puesto}</div>
            </div>
          )}

          {/* FORM AGREGAR */}
          <form onSubmit={guardarTarea} className="tarea-form">
            <div className="form-group">
              <label>Título:</label>
              <input
                type="text"
                name="titulo"
                className="form-input"
                value={form.titulo}
                onChange={handleChangeForm}
              />
            </div>

            <div className="form-group">
              <label>Descripción:</label>
              <textarea
                name="descripcion"
                className="form-input"
                value={form.descripcion}
                onChange={handleChangeForm}
              />
            </div>

            <div className="form-group">
  <label>Estatus:</label>
  <select
    name="estatus"
    className="form-input"
    value={form.estatus}
    onChange={handleChangeForm}
  >
    <option value="pendiente">Pendiente</option>
    <option value="completada">Completada</option>
  </select>
</div>


            <div className="form-group">
              <label>Fecha entrega:</label>
              <input
                type="date"
                name="fecha_entrega"
                className="form-input"
                value={form.fecha_entrega}
                onChange={handleChangeForm}
              />
            </div>

            <button type="submit" className="btn-guardar">
              Guardar tarea
            </button>
          </form>
        </div>
      )}

      {/* =============== VISTA VER =============== */}
      {vista === "ver" && usuarioSel && (
        <div className="tabla-card">
          <h3 className="titulo-usuarios">Tareas de {usuarioSel.nombre}</h3>

          {tareas.length === 0 ? (
            <p>No hay tareas.</p>
          ) : (
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
                {tareas.map((t) => {
                  const enEdicion = tareaEditando?.id === t.id;

                  return (
                    <tr key={t.id}>
                      <td>{t.id}</td>

                      <td>
                        {enEdicion ? (
                          <input
                            name="titulo"
                            className="form-input"
                            value={tareaEditando.titulo}
                            onChange={handleChangeEdicion}
                          />
                        ) : (
                          t.titulo
                        )}
                      </td>

                      <td>
                        {enEdicion ? (
                          <textarea
                            name="descripcion"
                            className="form-input"
                            value={tareaEditando.descripcion}
                            onChange={handleChangeEdicion}
                          />
                        ) : (
                          t.descripcion
                        )}
                      </td>

                      <td>
                        {enEdicion ? (
                          <select
                            name="estatus"
                            className="form-input"
                            value={tareaEditando.estatus}
                            onChange={handleChangeEdicion}
                          >
                            <option value="pendiente">Pendiente</option>
                            <option value="en_progreso">En Progreso</option>
                            <option value="completada">Completada</option>
                          </select>
                        ) : (
                          t.estatus
                        )}
                      </td>

                      <td>
                        {enEdicion ? (
                          <input
                            type="date"
                            name="fecha_entrega"
                            className="form-input"
                            value={
                              tareaEditando.fecha_entrega?.substring(0, 10)
                            }
                            onChange={handleChangeEdicion}
                          />
                        ) : (
                          t.fecha_entrega
                        )}
                      </td>

                      <td>{obtenerNombreUsuario(t.usuarioId)}</td>

                      <td>
                        {enEdicion ? (
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
                            <button
                              className="btn-editar"
                              onClick={() => empezarEdicion(t)}
                            >
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
          )}
        </div>
      )}

    </div>
  );
}

export default TareasPage;
