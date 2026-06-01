import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    // Al hacer login exitoso, vamos al grupo de pestañas
    router.replace("/tabs" as any);
  };

  return (
    <View style={styles.container}>
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
    backgroundColor: "#FFC0CB",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  glassCard: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
    borderColor: "rgba(255, 255, 255, 0.6)",
    borderWidth: 1,
  },
  catIcon: { fontSize: 50, marginBottom: 10 },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF1493",
    marginBottom: 5,
  },
  subtitle: { fontSize: 16, color: "#FF69B4", marginBottom: 30 },
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
  buttonText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
});
