import { memo, useCallback } from "react";

// React.memo: Buscador recibe `busqueda` (string primitivo) y `setBusqueda`
// (funcion de useState, que React garantiza que es siempre la misma referencia).
// Esto significa que las props de Buscador NUNCA cambian entre renders del padre
// a menos que el usuario este escribiendo. Sin memo, Buscador se re-renderizaria
// cada vez que App se actualiza (ej: al cargar notas, al eliminar, al editar).
// Con memo y props primitivas/estables, la comparacion shallow de React.memo
// funciona perfectamente: es el caso ideal del material.
const Buscador = memo(({ busqueda, setBusqueda }) => {
  // useCallback: el handler onChange se crea dentro del componente.
  // Al estar Buscador memorizado, este handler se recrea en cada render
  // del propio Buscador (que ya es poco frecuente gracias a memo).
  // Lo memorizamos de todas formas como buena practica para handlers de inputs.
  // setBusqueda es estable (viene de useState), por eso no va en dependencias.
  const handleChange = useCallback(
    (e) => {
      setBusqueda(e.target.value);
    },
    [setBusqueda],
  );

  return (
    <div className="buscador-contenedor">
      <input
        type="text"
        placeholder="Buscar nota por título..."
        value={busqueda}
        onChange={handleChange}
        className="buscador"
      />
    </div>
  );
});

Buscador.displayName = "Buscador";

export default Buscador;
