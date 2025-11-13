import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import UsuariosPage from "./pages/UsuariosPage";
import TareasPage from "./pages/TareasPage";

function AppContent() {
  const location = useLocation();

  // Detectar si estamos en la pantalla de login
  const ocultarNavbar = location.pathname === "/";

  return (
    <div>
      {!ocultarNavbar && <Navbar />} {/* 👈 Solo se muestra si NO estamos en login */}

      <Routes>
        <Route path="/" element={<UsuariosPage />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/tareas" element={<TareasPage />} />
        {/* 👇 Si alguien entra a una ruta no existente, lo manda al login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
