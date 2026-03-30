import express from "express";
import cors from "cors";
import itemsRoutes from "./routes/items.routes.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/api/items", itemsRoutes);

app.listen(PORT, () => {
  console.log(` Servidor corriendo exitosamente en http://localhost:${PORT}`);
});
