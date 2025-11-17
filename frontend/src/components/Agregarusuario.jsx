import { useState } from "react";
import { api } from "../Api.js"; 
// Importamos la instancia de Axios para hacer peticiones a la API

import "./Agregarusuarioestilo.css"; 
// Importamos los estilos del formulario


// Componente que agrega un nuevo usuario
function Agregarusuario({ onUsuarioAgregado }) {

  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
    puesto: "",
  });

  // Maneja los cambios en los inputs del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,                   // Copia el estado actual
      [e.target.name]: e.target.value // Actualiza el campo modificado
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita recargar la página

    try {
      // Validación simple de contraseña
      if (!formData.password.trim()) {
        alert("La contraseña es obligatoria");
        return;
      }

      // Enviar datos a la API (POST /usuarios)
      await api.post("/usuarios", formData);

      // Limpiar formulario después de agregar
      setFormData({
        nombre: "",
        email: "",
        password: "",
        telefono: "",
        puesto: "",
      });

      // Avisamos al padre que se agregó un usuario nuevo
      onUsuarioAgregado();

    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  return (
    <div className="usuario-form-container">
      {/* Formulario de registro */}
      <form className="usuario-form" onSubmit={handleSubmit}>
        
        <h2>Agregar Usuario</h2>

        {/* Campo Nombre */}
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

        {/* Campo Email */}
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

        {/* Campo Contraseña */}
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

        {/* Campo Teléfono */}
        <div className="form-group">
          <label>Teléfono:</label>
          <input
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="55-1234-5678"
          />
        </div>

        {/* Campo Puesto */}
        <div className="form-group">
          <label>Puesto:</label>
          <input
            name="puesto"
            value={formData.puesto}
            onChange={handleChange}
            placeholder="Ej. Supervisor"
          />
        </div>

        {/* Footer: Checkbox y botón */}
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
