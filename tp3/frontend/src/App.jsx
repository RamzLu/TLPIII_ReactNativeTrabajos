import { useState, useEffect, useContext } from "react";
import { NotasContext } from "./context/NotasContext";
import FormularioNota from "./components/FormularioNota";
import NotaItem from "./components/NotaItem";
import Buscador from "./components/Buscador";
import "./App.css";

function App() {
  const { notas, cargando, error, cargarDatos } = useContext(NotasContext);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const notasFiltradas = notas.filter((nota) =>
    nota.titulo.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <div className="contenedor-principal">
      <h1>Mi Sistema de Notas</h1>

      <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />

      <FormularioNota />

      {cargando && <p>Cargando tus notas...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="lista-notas">
        {!cargando && notasFiltradas.length === 0 ? (
          <p>No hay notas para mostrar.</p>
        ) : (
          notasFiltradas.map((nota) => <NotaItem key={nota._id} nota={nota} />)
        )}
      </div>
    </div>
  );
}

export default App;
