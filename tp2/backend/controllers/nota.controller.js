import Nota from "../models/nota.model.js";

export const getNotas = async (req, res) => {
  try {
    const notas = await Nota.find().sort({ createdAt: -1 });
    res.json(notas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las notas" });
  }
};

export const getNotaById = async (req, res) => {
  try {
    const nota = await Nota.findById(req.params.id);
    if (!nota) {
      return res.status(404).json({ mensaje: "Nota no encontrada (404)" });
    }
    res.json(nota);
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor al buscar por ID" });
  }
};

export const createNota = async (req, res) => {
  try {
    const { titulo, contenido, importante } = req.body;

    if (!titulo || !contenido) {
      return res
        .status(400)
        .json({ mensaje: "El título y el contenido son obligatorios (400)" });
    }

    const nuevaNota = new Nota({ titulo, contenido, importante });
    const notaGuardada = await nuevaNota.save();
    res.status(201).json(notaGuardada);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear la nota" });
  }
};

export const updateNota = async (req, res) => {
  try {
    const notaActualizada = await Nota.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!notaActualizada) {
      return res
        .status(404)
        .json({ mensaje: "Nota no encontrada para actualizar (404)" });
    }
    res.json(notaActualizada);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar" });
  }
};

export const deleteNota = async (req, res) => {
  try {
    const notaEliminada = await Nota.findByIdAndDelete(req.params.id);
    if (!notaEliminada) {
      return res
        .status(404)
        .json({ mensaje: "Nota no encontrada para eliminar (404)" });
    }
    res.json({ mensaje: "Nota eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar" });
  }
};
