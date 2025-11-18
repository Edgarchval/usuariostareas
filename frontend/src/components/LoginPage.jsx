import { useState } from "react";
import { api } from "../Api";
import "../App.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [puesto, setPuesto] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // ---------------------------
  // VALIDACIONES
  // ---------------------------

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validarTelefono = (telefono) => {
    if (!telefono) return true; // No obligatorio
    const regex = /^[0-9+\-\s]{7,15}$/;
    return regex.test(telefono);
  };

  // ---------------------------
  // LOGIN
  // ---------------------------
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMensaje("⚠️ Ingresa email y contraseña");
      return;
    }

    if (!validarEmail(email)) {
      setMensaje("⚠️ Ingresa un correo válido");
      return;
    }

    try {
      const res = await api.post("/login", { email, password });

      localStorage.setItem("usuario", JSON.stringify(res.data.usuario));

      setMensaje("✅ Inicio de sesión exitoso");

      window.location.href = "/usuarios";

    } catch (error) {
      console.error("❌ Error en login:", error);
      setMensaje("❌ Correo o contraseña incorrectos");
    }
  };

  // ---------------------------
  // REGISTRO
  //----------------------------
  const handleRegister = async (e) => {
    e.preventDefault();

    // VALIDACIONES
    if (!nombre.trim()) {
      setMensaje("⚠️ El nombre es obligatorio");
      return;
    }

    if (!email.trim() || !validarEmail(email)) {
      setMensaje("⚠️ Ingresa un correo válido");
      return;
    }

    if (!password.trim()) {
      setMensaje("⚠️ La contraseña es obligatoria");
      return;
    }

    if (!validarTelefono(telefono)) {
      setMensaje("⚠️ Teléfono inválido (solo números, - o espacios)");
      return;
    }

    if (!puesto.trim()) {
      setMensaje("⚠️ Ingresa un puesto válido");
      return;
    }

    try {
      await api.post("/usuarios", {
        nombre,
        email,
        password,
        telefono,
        puesto,
      });

      setMensaje("✅ Usuario registrado correctamente");
      setIsRegister(false);

      setNombre("");
      setEmail("");
      setPassword("");
      setTelefono("");
      setPuesto("");

    } catch (error) {
      console.error(error);

      if (error.response?.data?.message?.includes("email")) {
        setMensaje("⚠️ Ese correo ya está registrado");
      } else {
        setMensaje("❌ Error al registrar usuario");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        {/* TITULO SIN IMAGEN */}
        <h2>{isRegister ? "Crear cuenta" : "Inicio de sesión"}</h2>

        <form onSubmit={isRegister ? handleRegister : handleLogin}>

          {/* ----- CAMPOS EXTRA SOLO EN REGISTRO ----- */}
          {isRegister && (
            <>
              <input
                type="text"
                placeholder="Nombre completo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />

              <input
                type="text"
                placeholder="Puesto"
                value={puesto}
                onChange={(e) => setPuesto(e.target.value)}
              />
            </>
          )}

          {/* ----- CAMPOS GENERALES ----- */}
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

        {mensaje && <p className="mensaje">{mensaje}</p>}

        <p className="toggle" onClick={() => setIsRegister(!isRegister)}>
          {isRegister
            ? "¿Ya tienes cuenta? Inicia sesión"
            : "¿No tienes cuenta? Crear nueva cuenta"}
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
