import { useState, useEffect } from "react";
import FormularioNota from "./components/FormularioNota";
import NotaItem from "./components/NotaItem";
import Buscador from "./components/Buscador";
import * as notasService from "./services/notas.service";
import "./App.css";

function App() {
  const [notas, setNotas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Se ejecuta una sola vez cuando el componente se monta en pantalla
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      setError(null); // limpiar errores viejos
      const datos = await notasService.obtenerNotas();
      setNotas(datos);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const manejarAgregarNota = async (nuevaNota) => {
    try {
      const notaGuardada = await notasService.crearNota(nuevaNota);
      setNotas([notaGuardada, ...notas]); // La agregamos al principio de la lista
    } catch (err) {
      alert("No se pudo guardar la nota");
    }
  };

  const manejarEliminarNota = async (id) => {
    try {
      await notasService.eliminarNota(id);
      // Filtramos la lista para quitar la nota eliminada sin tener que recargar la página
      setNotas(notas.filter((nota) => nota._id !== id));
    } catch (err) {
      alert("No se pudo eliminar la nota");
    }
  };

  // Filtrado reactivo: se actualiza automáticamente cuando 'busqueda' o 'notas' cambian
  const notasFiltradas = notas.filter((nota) =>
    nota.titulo.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <div className="contenedor-principal">
      <h1>Mi Sistema de Notas </h1>

      <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />

      <FormularioNota alAgregar={manejarAgregarNota} />

      {cargando && <p>Cargando tus notas...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="lista-notas">
        {!cargando && notasFiltradas.length === 0 ? (
          <p>No hay notas para mostrar.</p>
        ) : (
          notasFiltradas.map((nota) => (
            <NotaItem
              key={nota._id}
              nota={nota}
              alEliminar={manejarEliminarNota}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
