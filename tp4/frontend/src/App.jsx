import { useState, useEffect, useContext, useMemo } from "react";
import { NotasContext } from "./context/NotasContext";
import FormularioNota from "./components/FormularioNota";
import NotaItem from "./components/NotaItem";
import Buscador from "./components/Buscador";
import "./App.css";

function App() {
  const { notas, cargando, error, cargarDatos, eliminarNota, setNotaAEditar } =
    useContext(NotasContext);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  // useMemo: notasFiltradas es un calculo que depende de `notas` y `busqueda`.
  // Sin useMemo, el filtrado se ejecuta en cada render de App (incluso si solo
  // cambia un estado interno no relacionado). Con listas grandes, esto seria costoso.
  // La funcion solo se recalcula cuando `notas` o `busqueda` realmente cambian.
  const notasFiltradas = useMemo(
    () =>
      notas.filter((nota) =>
        nota.titulo.toLowerCase().includes(busqueda.toLowerCase()),
      ),
    [notas, busqueda],
  );

  return (
    <div className="contenedor-principal">
      <h1>Mi Sistema de Notas</h1>

      {/* Buscador memorizado con React.memo: solo se re-renderiza si sus props cambian */}
      <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />

      {/* FormularioNota memorizado con React.memo */}
      <FormularioNota />

      {cargando && <p>Cargando tus notas...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="lista-notas">
        {!cargando && notasFiltradas.length === 0 ? (
          <p>No hay notas para mostrar.</p>
        ) : (
          notasFiltradas.map((nota) => (
            // NotaItem memorizado con React.memo: solo se re-renderiza si su `nota`,
            // `onEliminar` o `onEditar` cambian. Las funciones vienen estabilizadas
            // con useCallback desde el contexto, cerrando correctamente.
            <NotaItem
              key={nota._id}
              nota={nota}
              onEliminar={eliminarNota}
              onEditar={setNotaAEditar}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
