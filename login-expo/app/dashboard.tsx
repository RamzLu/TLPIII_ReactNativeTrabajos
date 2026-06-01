import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.glassCard}>
        <Text style={styles.catGroup}>🐈 🐾 🐈‍⬛</Text>
        <Text style={styles.title}>¡Dashboard Cute!</Text>
        <Text style={styles.subtitle}>Has iniciado sesión con éxito 💖</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/expo-default")}
        >
          <Text style={styles.buttonText}>
            Ir a la página principal (Ejemplo Expo) 🚀
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Reutilizamos los mismos estilos fluidos del login
  container: {
    flex: 1,
    backgroundColor: "#FFB6C1", // Un tono de rosa ligeramente distinto
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  glassCard: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
    borderColor: "rgba(255, 255, 255, 0.7)",
    borderWidth: 1,
  },
  catGroup: {
    fontSize: 40,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF1493",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#FF69B4",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FF1493",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
