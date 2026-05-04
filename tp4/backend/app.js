import express from "express";
import cors from "cors";
import "dotenv/config";
import notasRoutes from "./routes/nota.routes.js";
import { conectarDB } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares requeridos
app.use(cors());
app.use(express.json());
conectarDB();

app.use("/api/notas", notasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
