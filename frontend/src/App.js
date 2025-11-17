import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";

// Componentes principales
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage"; // (No se está usando, pero aparece importado)
import UsuariosPage from "./pages/UsuariosPage";
import TareasPage from "./pages/TareasPage";


// Este componente maneja el contenido principal de la app
function AppContent() {

  // Hook que permite saber en qué ruta estamos
  const location = useLocation();

  // Si estamos en "/" se oculta la Navbar (para pantallas tipo login)
  const ocultarNavbar = location.pathname === "/";

  return (
    <div>

      {/* Mostrar navbar solo si NO estamos en la pantalla de login */}
      {!ocultarNavbar && <Navbar />}

      {/* RUTAS DE LA APLICACIÓN */}
      <Routes>

        {/* Ruta principal (se usa UsuariosPage como página de inicio) */}
        <Route path="/" element={<UsuariosPage />} />

        {/* Página de usuarios */}
        <Route path="/usuarios" element={<UsuariosPage />} />

        {/* Página de tareas */}
        <Route path="/tareas" element={<TareasPage />} />

        {/* 
          Ruta de fallback:
          Si el usuario entra a una ruta que no existe,
          lo redirige automáticamente a "/"
        */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </div>
  );
}


// Este componente envuelve todo dentro del Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
