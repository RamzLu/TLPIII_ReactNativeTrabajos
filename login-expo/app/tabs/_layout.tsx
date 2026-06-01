import { Tabs } from "expo-router";
import { Text } from "react-native";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Oculta la barra superior en las pestañas
        tabBarActiveTintColor: "#FF1493", // Deep Pink para el ícono activo
        tabBarInactiveTintColor: "#FFB6C1", // Rosa claro para los inactivos
        tabBarStyle: {
          backgroundColor: "#FFF0F5", // Fondo Lavanda/Rosa muy claro
          borderTopWidth: 1,
          borderTopColor: "#FFC0CB",
          height: 60,
          paddingBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard 🐾",
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Expo 🌸",
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>✨</Text>,
        }}
      />
    </Tabs>
  );
}
