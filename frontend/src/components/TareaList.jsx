function TareaList({ tareas }) {
  return (
    <div>
      <h3>Lista de Tareas</h3>
      <ul>
        {tareas.map((t) => (
          <li key={t.id}>
            {t.descripcion} — Usuario ID: {t.usuarioId}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TareaList;
