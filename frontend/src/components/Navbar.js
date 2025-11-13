import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ backgroundColor: "#003366", padding: "10px" }}>
      <Link to="/usuarios" style={{ color: "white", marginRight: 20 }}>Usuarios</Link>
      <Link to="/tareas" style={{ color: "white" }}>Tareas</Link>
    </nav>
  );
}

export default Navbar;
