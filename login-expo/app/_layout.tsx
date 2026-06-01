import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Pantalla de Login */}
      <Stack.Screen name="index" />
      {/* Pantalla de Dashboard */}
      <Stack.Screen name="dashboard" />
      {/* Pantalla con el código por defecto */}
      <Stack.Screen
        name="expo-default"
        options={{
          headerShown: true,
          title: "🌸 Código de Expo",
          headerStyle: { backgroundColor: "#FFB6C1" },
          headerTintColor: "#FFF",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    </Stack>
  );
}
