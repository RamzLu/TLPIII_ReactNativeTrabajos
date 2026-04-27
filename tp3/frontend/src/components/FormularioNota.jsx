import { useState, useContext, useEffect } from "react";
import { NotasContext } from "../context/NotasContext";

const FormularioNota = () => {
  // Aquí traemos las funciones directamente desde el contexto global
  const { agregarNota, editarNota, notaAEditar, setNotaAEditar } =
    useContext(NotasContext);

  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");

  // Este useEffect llena el formulario si hacemos clic en "Editar" en alguna nota
  useEffect(() => {
    if (notaAEditar) {
      setTitulo(notaAEditar.titulo);
      setContenido(notaAEditar.contenido);
    } else {
      setTitulo("");
      setContenido("");
    }
  }, [notaAEditar]);

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (!titulo.trim() || !contenido.trim()) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Aquí es donde ocurría el error. Ahora usamos las funciones del Contexto.
    if (notaAEditar) {
      editarNota(notaAEditar._id, { titulo, contenido });
    } else {
      agregarNota({ titulo, contenido });
    }

    // Limpiamos el formulario
    setTitulo("");
    setContenido("");
  };

  const cancelarEdicion = () => {
    setNotaAEditar(null);
  };

  return (
    <form onSubmit={manejarEnvio} className="formulario">
      <h3>{notaAEditar ? "Editar Nota" : "Crear Nueva Nota"}</h3>
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
      <div style={{ display: "flex", gap: "10px" }}>
        <button type="submit">
          {notaAEditar ? "Actualizar Nota" : "Guardar Nota"}
        </button>
        {notaAEditar && (
          <button
            type="button"
            onClick={cancelarEdicion}
            style={{ backgroundColor: "#888" }}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default FormularioNota;
