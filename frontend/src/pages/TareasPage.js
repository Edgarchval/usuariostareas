import { useEffect, useState } from "react";
import { api } from "../Api.js";
import TareaList from "../components/TareaList";
import TareaForm from "../components/TareaForm";

function TareasPage() {
  const [tareas, setTareas] = useState([]);

  const cargarTareas = async () => {
    try {
      const res = await api.get("/tareas");
      setTareas(res.data);
    } catch (error) {
      console.error("Error al cargar tareas:", error);
    }
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Gestión de Tareas</h2>
      <TareaForm onTareaAgregada={cargarTareas} />
      <TareaList tareas={tareas} />
    </div>
  );
}

export default TareasPage;
