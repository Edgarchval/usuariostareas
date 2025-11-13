import { useState } from "react";
import { api } from "../Api";
import "../App.css";

function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // 🔐 Iniciar sesión
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, password });
      setMensaje("✅ Inicio de sesión exitoso");
      onLoginSuccess(res.data.usuario);
    } catch (error) {
      setMensaje("❌ Correo o contraseña incorrectos");
    }
  };

  // 🆕 Registrar usuario
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/usuarios", { nombre, email, password });
      setMensaje("✅ Usuario registrado correctamente");
      setIsRegister(false);
      setNombre("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMensaje("❌ Error al registrar usuario");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Logo_Coppel.svg"
          alt="Coppel Logo"
          className="logo"
        />

        <h2>{isRegister ? "Crear cuenta" : "Iniciar sesión"}</h2>

        <form onSubmit={isRegister ? handleRegister : handleLogin}>
          {isRegister && (
            <input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            {isRegister ? "Registrar" : "Ingresar"}
          </button>
        </form>

        <p className="mensaje">{mensaje}</p>

        <p className="toggle" onClick={() => setIsRegister(!isRegister)}>
          {isRegister
            ? "¿Ya tienes cuenta? Inicia sesión"
            : "¿No tienes cuenta? Crear una nueva"}
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
