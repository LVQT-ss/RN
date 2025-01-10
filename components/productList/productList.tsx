import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  Platform,
  Pressable,
  View,
  Text,
} from "react-native";
import { Image } from "expo-image";
import { getAllProducts } from "../../api/ApiFunctions";

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
        contentContainerStyle={styles.listContainer}
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
                <Pressable style={styles.addButton}>
                  <Text style={styles.addButtonText}>Add to Cart</Text>
                </Pressable>
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
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 12,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  retryButton: {
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    maxWidth: '47%', // Ensures consistent width with margins
  },
  cardHeader: {
    padding: 8,
    alignItems: 'flex-end',
  },
  favoriteIcon: {
    width: 24,
    height: 24,
  },
  productImage: {
    width: '100%',
    aspectRatio: 1, // Square image
    borderRadius: 8,
  },
  cardFooter: {
    padding: 12,
  },
  productInfo: {
    gap: 6,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    minHeight: 40, // Accommodates 2 lines of text
    lineHeight: 20,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ProductList;
