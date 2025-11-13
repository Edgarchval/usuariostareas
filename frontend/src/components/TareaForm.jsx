import { useState } from "react";
import { api } from "../Api.js";

function TareaForm({ onTareaAgregada }) {
  const [descripcion, setDescripcion] = useState("");
  const [usuarioId, setUsuarioId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tareas", { descripcion, usuarioId });
      setDescripcion("");
      setUsuarioId("");
      onTareaAgregada();
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>Agregar Tarea</h3>
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="ID Usuario"
        value={usuarioId}
        onChange={(e) => setUsuarioId(e.target.value)}
        required
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default TareaForm;
