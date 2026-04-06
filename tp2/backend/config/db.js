import mongoose from "mongoose";

export const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conexión exitosa");
  } catch (error) {
    console.error("Error al conectar", error);
    process.exit(1); //para cierre inmediato en caso de algun error fatal
  }
};
