import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Pantalla de Login */}
      <Stack.Screen name="index" />
      {/* Grupo de pestañas (Dashboard y Expo) */}
      <Stack.Screen name="tabs" />
    </Stack>
  );
}
