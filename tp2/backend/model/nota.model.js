import mongoose from "mongoose";

const notaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    contenido: {
      type: String,
      required: true,
    },
    importante: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Nota", notaSchema);
