import { memo, useCallback } from "react";

// React.memo: NotaItem aparece N veces en pantalla (una por cada nota).
// Sin memo, cada vez que el padre (App) se re-renderiza —por ejemplo al
// escribir en el buscador— TODOS los items se vuelven a renderizar, aunque
// sus datos no hayan cambiado. Con memo, solo se re-renderiza el item cuya
// prop `nota`, `onEliminar` u `onEditar` haya cambiado realmente.
// Esto es el caso tipico de "componente que aparece muchas veces en pantalla"
// descrito en el material de clase.
const NotaItem = memo(({ nota, onEliminar, onEditar }) => {
  // useCallback: estas funciones se crean dentro del componente y se pasan
  // a los botones como handlers. Sin useCallback, cada render de NotaItem
  // (aunque este memorizado) crearia nuevas funciones. Al estar el componente
  // envuelto en React.memo y recibir las props estables, esto es un nivel
  // adicional de prolojidad: evitamos recrear los closures innecesariamente.
  // La dependencia `nota._id` garantiza que si cambia el id (no deberia,
  // pero es correcto declararlo), la funcion se actualiza.
  const handleEliminar = useCallback(() => {
    onEliminar(nota._id);
  }, [onEliminar, nota._id]);

  const handleEditar = useCallback(() => {
    onEditar(nota);
  }, [onEditar, nota]);

  return (
    <div className="nota-card">
      <h4>{nota.titulo}</h4>
      <p>{nota.contenido}</p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={handleEliminar} className="btn-eliminar">
          Eliminar
        </button>
        <button onClick={handleEditar} className="btn-editar">
          Editar
        </button>
      </div>
    </div>
  );
});

// Nombre para React DevTools: facilita identificar el componente en el Profiler
NotaItem.displayName = "NotaItem";

export default NotaItem;
