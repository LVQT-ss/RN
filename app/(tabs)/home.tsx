import FloatingCart from "@/components/FloatingCart/FloatingCart";
import ProductList from "@/components/productList/productList";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";

export default function Home() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ProductList />
        <FloatingCart />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  container: {
    flex: 1,
  },
});
