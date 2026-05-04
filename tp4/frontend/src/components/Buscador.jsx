const Buscador = ({ busqueda, setBusqueda }) => {
  return (
    <div className="buscador-contenedor">
      <input
        type="text"
        placeholder="Buscar nota por título..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="buscador"
      />
    </div>
  );
};

export default Buscador;
