import { createContext, useReducer, useCallback, useMemo } from "react";
import * as notasService from "../services/notas.service";

export const NotasContext = createContext();

const initialState = {
  notas: [],
  notaAEditar: null,
  cargando: false,
  error: null,
};

const notasReducer = (state, action) => {
  switch (action.type) {
    case "INICIAR_CARGA":
      return { ...state, cargando: true, error: null };
    case "SET_ERROR":
      return { ...state, cargando: false, error: action.payload };
    case "CARGAR_NOTAS":
      return { ...state, notas: action.payload, cargando: false };
    case "AGREGAR_NOTA":
      return { ...state, notas: [action.payload, ...state.notas] };
    case "ELIMINAR_NOTA":
      return {
        ...state,
        notas: state.notas.filter((nota) => nota._id !== action.payload),
      };
    case "ACTUALIZAR_NOTA":
      return {
        ...state,
        notas: state.notas.map((nota) =>
          nota._id === action.payload._id ? action.payload : nota,
        ),
        notaAEditar: null,
      };
    case "SET_NOTA_A_EDITAR":
      return { ...state, notaAEditar: action.payload };
    default:
      return state;
  }
};

export const NotasProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notasReducer, initialState);

  // useCallback: cargarDatos es dependencia del useEffect en App.jsx.
  // Sin esto, cada render del Provider genera una nueva referencia,
  // disparando el useEffect en un loop infinito.
  const cargarDatos = useCallback(async () => {
    dispatch({ type: "INICIAR_CARGA" });
    try {
      const datos = await notasService.obtenerNotas();
      dispatch({ type: "CARGAR_NOTAS", payload: datos });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, []);

  // useCallback: agregarNota se pasa a FormularioNota (memorizado con React.memo).
  // Sin esto, cada render del Provider crea una nueva referencia de la función,
  // rompiendo la memoizacion del hijo y causando re-renders innecesarios.
  const agregarNota = useCallback(async (nuevaNota) => {
    try {
      const notaGuardada = await notasService.crearNota(nuevaNota);
      dispatch({ type: "AGREGAR_NOTA", payload: notaGuardada });
    } catch (error) {
      console.error("Error al agregar nota:", error);
    }
  }, []);

  // useCallback: eliminarNota se pasa a cada NotaItem (memorizado con React.memo).
  // Sin esto, al cambiar cualquier estado, TODOS los NotaItem de la lista
  // se re-renderizan aunque sus datos no hayan cambiado
  const eliminarNota = useCallback(async (id) => {
    try {
      await notasService.eliminarNota(id);
      dispatch({ type: "ELIMINAR_NOTA", payload: id });
    } catch (error) {
      console.error("Error al eliminar nota:", error);
    }
  }, []);

  // useCallback: editarNota se consume en FormularioNota (memorizado).
  // Referencia estable evita re-renders del formulario cuando cambia
  // el estado de otras notas (ej al eliminar una nota distinta)
  const editarNota = useCallback(async (id, notaActualizada) => {
    try {
      const notaGuardada = await notasService.actualizarNota(
        id,
        notaActualizada,
      );
      dispatch({ type: "ACTUALIZAR_NOTA", payload: notaGuardada });
    } catch (error) {
      console.error("Error al editar nota:", error);
    }
  }, []);

  // useCallback: setNotaAEditar se pasa a NotaItem y a FormularioNota (ambos memorizados).
  // Mantener su referencia estable evita que esos hijos se re-rendericen
  // por culpa de esta funcion recreada en cada ciclo
  const setNotaAEditar = useCallback((nota) => {
    dispatch({ type: "SET_NOTA_A_EDITAR", payload: nota });
  }, []);

  // useMemo: el objeto value del Provider se recrea en cada render si no se memoriza.
  // Esto provoca que TODOS los consumidores del contexto se re-rendericen aunque
  // los datos no hayan cambiado. useMemo garantiza la misma referencia del objeto
  // mientras state y las funciones (ya estabilizadas) no cambien
  const contextValue = useMemo(
    () => ({
      ...state,
      cargarDatos,
      agregarNota,
      eliminarNota,
      editarNota,
      setNotaAEditar,
    }),
    [state, cargarDatos, agregarNota, eliminarNota, editarNota, setNotaAEditar],
  );

  return (
    <NotasContext.Provider value={contextValue}>
      {children}
    </NotasContext.Provider>
  );
};
