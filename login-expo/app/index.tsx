import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    // Al hacer login exitoso, reemplazamos la ruta para no poder volver atrás al login
    router.replace("/dashboard");
  };

  return (
    <View style={styles.container}>
      {/* Efecto Glassmorphism */}
      <View style={styles.glassCard}>
        <Text style={styles.catIcon}>🐱✨</Text>
        <Text style={styles.title}>¡Bienvenida!</Text>
        <Text style={styles.subtitle}>Inicia sesión para entrar</Text>

        <TextInput
          style={styles.input}
          placeholder="Usuario..."
          placeholderTextColor="#FF69B4"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña..."
          placeholderTextColor="#FF69B4"
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar 🎀</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFC0CB", // Rosa pastel de fondo
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  glassCard: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "rgba(255, 255, 255, 0.4)", // Transparencia tipo cristal
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
    borderColor: "rgba(255, 255, 255, 0.6)",
    borderWidth: 1,
    // Sombra suave
    shadowColor: "#FF69B4",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  },
  catIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF1493", // Deep pink
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#FF69B4",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#FF1493",
  },
  button: {
    backgroundColor: "#FF69B4",
    width: "100%",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
