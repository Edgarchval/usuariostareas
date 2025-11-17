import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";

// Creamos el "root" de la aplicación React.
// React busca un elemento con id="root" dentro del index.html
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderizamos la aplicación dentro del modo estricto de React
root.render(
  <React.StrictMode>
    {/* Componente principal de la aplicación */}
    <App />
  </React.StrictMode>
);
