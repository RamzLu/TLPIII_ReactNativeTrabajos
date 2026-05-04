import React from "react";
const NotaItem = ({ nota, alEliminar }) => {
  return (
    <div className="nota-card">
      <h4>{nota.titulo}</h4>
      <p>{nota.contenido}</p>
      <button onClick={() => alEliminar(nota._id)} className="btn-eliminar">
        Eliminar
      </button>
    </div>
  );
};

export default NotaItem;
