import { View, Text, StyleSheet } from "react-native";

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.glassCard}>
        <Text style={styles.catGroup}>🐈 🐾 🐈‍⬛</Text>
        <Text style={styles.title}>¡Dashboard Cute!</Text>
        <Text style={styles.subtitle}>Has iniciado sesión con éxito 💖</Text>
        <Text style={styles.text}>Navega con la barra de abajo 👇</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFB6C1",
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
  catGroup: { fontSize: 40, marginBottom: 15 },
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
    marginBottom: 10,
    textAlign: "center",
  },
  text: { fontSize: 14, color: "#FF1493", fontWeight: "bold" },
});
