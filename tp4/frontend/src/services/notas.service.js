//Segun el principio de software "Responsabilidad única" las
// carpetas service se utiliza para separar la lógica de comunicación
//  on el backend de la lógica visual

const API_URL = "http://localhost:3001/api/notas";

export const obtenerNotas = async () => {
  const respuesta = await fetch(API_URL);
  if (!respuesta.ok) throw new Error("Error al obtener las notas");
  return respuesta.json();
};

export const crearNota = async (nuevaNota) => {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevaNota),
  });
  if (!respuesta.ok) throw new Error("Error al crear la nota");
  return respuesta.json();
};

export const actualizarNota = async (id, notaActualizada) => {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(notaActualizada),
  });
  if (!respuesta.ok) throw new Error("Error al actualizar la nota");
  return respuesta.json();
};

export const eliminarNota = async (id) => {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!respuesta.ok) throw new Error("Error al eliminar la nota");
  return respuesta.json();
};
