import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CartProvider } from "@/context/CartContext";

export default function TabLayout() {
  return (
    <CartProvider>
      <Tabs screenOptions={{ headerShown: false }}>
        {" "}
        {/* Hide headers globally */}
        <Tabs.Screen
          name="home"
          options={{
            title: "Cashier",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={
                  focused ? "information-circle" : "information-circle-outline"
                }
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="checkout"
          options={{
            title: "Order",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "cart" : "cart-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        />
      </Tabs>
    </CartProvider>
  );
}
