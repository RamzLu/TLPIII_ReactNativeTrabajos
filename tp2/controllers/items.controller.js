let items = [
  { id: 1, titulo: "Aprender Node.js con ES Modules", completado: true },
  { id: 2, titulo: "Conectar con React", completado: false },
];

export const getItems = (req, res) => {
  res.json(items);
};

export const getItemById = (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ mensaje: "Elemento no encontrado" });
  }
  res.json(item);
};

export const createItem = (req, res) => {
  const nuevoId = items.length > 0 ? items[items.length - 1].id + 1 : 1;
  const nuevoItem = {
    id: nuevoId,
    ...req.body,
  };
  items.push(nuevoItem);
  res.status(201).json(nuevoItem);
};

export const updateItem = (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ mensaje: "Elemento no encontrado" });
  }

  items[index] = { ...items[index], ...req.body, id: items[index].id };
  res.json(items[index]);
};

export const deleteItem = (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ mensaje: "Elemento no encontrado" });
  }

  items.splice(index, 1);
  res.json({ mensaje: "Elemento eliminado correctamente" });
};
