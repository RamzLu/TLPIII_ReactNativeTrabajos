import { useState, useContext, useEffect, memo, useCallback } from "react";
import { NotasContext } from "../context/NotasContext";

// React.memo: FormularioNota no recibe props directamente (toma todo del contexto),
// pero al estar dentro del arbol de App, se re-renderizaria con cada cambio de App.
// Con memo, React verifica si sus props cambiaron: como no tiene props, la comparacion
// siempre da "igual" y el componente NUNCA se re-renderiza por culpa del padre.
// Solo se re-renderiza cuando su propio estado interno (titulo, contenido) cambia,
// o cuando los valores del contexto que consume (notaAEditar, etc.) cambian.
const FormularioNota = memo(() => {
  const { agregarNota, editarNota, notaAEditar, setNotaAEditar } =
    useContext(NotasContext);

  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");

  useEffect(() => {
    if (notaAEditar) {
      setTitulo(notaAEditar.titulo);
      setContenido(notaAEditar.contenido);
    } else {
      setTitulo("");
      setContenido("");
    }
  }, [notaAEditar]);

  // useCallback: manejarEnvio depende de titulo, contenido, notaAEditar y las
  // funciones del contexto. Se memoriza para no recrear la funcion en cada
  // keystroke del usuario (cada cambio de titulo/contenido re-renderiza FormularioNota).
  // Aunque aqui el beneficio de rendimiento es menor (no se pasa a un hijo memo),
  // es buena practica cuando una funcion tiene varias dependencias y se usa como
  // handler de eventos del formulario.
  const manejarEnvio = useCallback(
    (e) => {
      e.preventDefault();

      if (!titulo.trim() || !contenido.trim()) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      if (notaAEditar) {
        editarNota(notaAEditar._id, { titulo, contenido });
      } else {
        agregarNota({ titulo, contenido });
      }

      setTitulo("");
      setContenido("");
    },
    [titulo, contenido, notaAEditar, agregarNota, editarNota],
  );

  // useCallback: cancelarEdicion solo depende de setNotaAEditar (estable por useCallback
  // en el contexto). La referencia de esta funcion nunca cambia, evitando re-renders
  // del boton Cancelar si estuviera en un hijo memorizado.
  const cancelarEdicion = useCallback(() => {
    setNotaAEditar(null);
  }, [setNotaAEditar]);

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
});

FormularioNota.displayName = "FormularioNota";

export default FormularioNota;
