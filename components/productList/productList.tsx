import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  Platform,
  Pressable,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { getAllProducts } from "../../api/ApiFunctions";
import { useCart } from "@/context/CartContext";
// Define the Product interface
interface Product {
  productId: number;
  productName: string;
  productPrice: number;
  image: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data as Product[]);
      setError(null);
    } catch (err) {
      setError("Failed to fetch products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text>{error}</Text>
        <Pressable style={styles.retryButton} onPress={fetchProducts}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        numColumns={2}
        // contentContainerStyle={styles.listContainer}
        keyExtractor={(item: Product) => item.productId.toString()}
        renderItem={({ item }: { item: Product }) => (
          <Pressable
            style={styles.card}
            onPress={() => {
              console.log("Selected product:", item);
            }}
          >
            <View style={styles.cardHeader}>
              <Image
                style={styles.favoriteIcon}
                source={{
                  uri: "https://img.icons8.com/flat_round/64/000000/hearts.png",
                }}
              />
            </View>
            <Image
              source={{ uri: item.image }}
              style={styles.productImage}
              contentFit="cover"
              transition={200}
            />
            <View style={styles.cardFooter}>
              <View style={styles.productInfo}>
                <Text
                  style={styles.productName}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.productName}
                </Text>
                <Text style={styles.productPrice}>${item.productPrice}</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addToCart(item)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.addButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: Platform.OS === "ios" ? 0 : 20,
  },
  listContainer: {
    padding: 0,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: "hidden",
    maxWidth: "47%", // Ensures 2 columns with margin
  },
  cardHeader: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 1,
  },
  favoriteIcon: {
    width: 24,
    height: 24,
  },
  productImage: {
    width: "100%",
    height: 150,
    backgroundColor: "#f0f0f0",
  },
  cardFooter: {
    padding: 12,
  },
  productInfo: {
    gap: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
    height: 40, // Fixed height for 2 lines
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 4,
  },
  addButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProductList;
