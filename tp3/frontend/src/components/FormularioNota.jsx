import { useState } from "react";

const FormularioNota = ({ alAgregar }) => {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (!titulo.trim() || !contenido.trim()) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    alAgregar({ titulo, contenido });
    // se limpian los inputs
    setTitulo("");
    setContenido("");
  };

  return (
    <form onSubmit={manejarEnvio} className="formulario">
      <h3>Crear Nueva Nota</h3>
      <input
        type="text"
        placeholder="Título de la nota"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <textarea
        placeholder="Escribe el contenido aquí..."
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
      />
      <button type="submit">Guardar Nota</button>
    </form>
  );
};

export default FormularioNota;
