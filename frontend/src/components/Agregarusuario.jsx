import { useState } from "react";
import { api } from "../Api.js";
import "./Agregarusuarioestilo.css"; // 👈 Importamos el CSS

function Agregarusuario({ onUsuarioAgregado }) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
    puesto: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.password.trim()) {
        alert("La contraseña es obligatoria");
        return;
      }

      await api.post("/usuarios", formData);
      setFormData({
        nombre: "",
        email: "",
        password: "",
        telefono: "",
        puesto: "",
      });
      onUsuarioAgregado();
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  return (
    <div className="usuario-form-container">
      <form className="usuario-form" onSubmit={handleSubmit}>
        <h2>Agregar Usuario</h2>

        <div className="form-group">
          <label>Nombre:</label>
          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej. Carlos"
            required
          />
        </div>

        <div className="form-group">
          <label>Correo:</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@correo.com"
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
            required
          />
        </div>

        <div className="form-group">
          <label>Teléfono:</label>
          <input
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="55-1234-5678"
          />
        </div>

        <div className="form-group">
          <label>Puesto:</label>
          <input
            name="puesto"
            value={formData.puesto}
            onChange={handleChange}
            placeholder="Ej. Supervisor"
          />
        </div>

        <div className="form-footer">
          <label className="checkbox">
            <input type="checkbox" required /> Acepto los Términos y Condiciones
          </label>
          <button type="submit" className="btn-enviar">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Agregarusuario;
