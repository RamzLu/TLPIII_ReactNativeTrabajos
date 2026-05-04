import { createContext, useReducer, useCallback } from "react";
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

  const cargarDatos = useCallback(async () => {
    dispatch({ type: "INICIAR_CARGA" });
    try {
      const datos = await notasService.obtenerNotas();
      dispatch({ type: "CARGAR_NOTAS", payload: datos });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, []);

  const agregarNota = async (nuevaNota) => {
    try {
      const notaGuardada = await notasService.crearNota(nuevaNota);
      dispatch({ type: "AGREGAR_NOTA", payload: notaGuardada });
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarNota = async (id) => {
    try {
      await notasService.eliminarNota(id);
      dispatch({ type: "ELIMINAR_NOTA", payload: id });
    } catch (error) {
      console.error(error);
    }
  };

  const editarNota = async (id, notaActualizada) => {
    try {
      const notaGuardada = await notasService.actualizarNota(
        id,
        notaActualizada,
      );
      dispatch({ type: "ACTUALIZAR_NOTA", payload: notaGuardada });
    } catch (error) {
      console.error(error);
    }
  };

  const setNotaAEditar = (nota) => {
    dispatch({ type: "SET_NOTA_A_EDITAR", payload: nota });
  };

  return (
    <NotasContext.Provider
      value={{
        ...state,
        cargarDatos,
        agregarNota,
        eliminarNota,
        editarNota,
        setNotaAEditar,
      }}
    >
      {children}
    </NotasContext.Provider>
  );
};
