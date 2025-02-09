import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import { useCart } from "@/context/CartContext";
import { router } from "expo-router";

const Checkout = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } =
    useCart();

  // Add console log for debugging
  console.log("Cart Items in Checkout:", cartItems);

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <TouchableOpacity
          style={styles.continueShoppingButton}
          onPress={() => router.back()}
        >
          <Text style={styles.continueShoppingText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handlePlaceOrder = () => {
    // Add your order placement logic here
    alert("Order placed successfully!");
    // Optionally navigate back to home or to an order confirmation page
    router.push("/home");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Checkout</Text>
          <Text style={styles.itemCount}>({cartItems.length} items)</Text>
        </View>

        <View style={styles.cartSection}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {cartItems.map((item) => (
            <View key={item.productId} style={styles.cartItem}>
              <Image
                source={{ uri: item.image }}
                style={styles.itemImage}
                contentFit="cover"
                transition={200}
              />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={2}>
                  {item.productName}
                </Text>
                <Text style={styles.itemPrice}>
                  ${(item.productPrice * item.quantity).toFixed(2)}
                </Text>
                <View style={styles.quantityControl}>
                  <TouchableOpacity
                    onPress={() =>
                      updateQuantity(item.productId, item.quantity - 1)
                    }
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => removeFromCart(item.productId)}
                style={styles.removeButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.removeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Price Details</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>
              ${getTotalPrice().toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>$0.00</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax (10%)</Text>
            <Text style={styles.summaryValue}>
              ${(getTotalPrice() * 0.1).toFixed(2)}
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              ${(getTotalPrice() * 1.1).toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.checkoutButtonText}>
            Place Order (${(getTotalPrice() * 1.1).toFixed(2)})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1F2937",
  },
  itemCount: {
    fontSize: 16,
    color: "#6B7280",
    marginLeft: 8,
  },
  cartSection: {
    backgroundColor: "#FFFFFF",
    marginTop: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  cartItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
    alignItems: "center",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#059669",
    marginTop: 4,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  quantityButton: {
    width: 28,
    height: 28,
    backgroundColor: "#F3F4F6",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 16,
    color: "#4B5563",
    fontWeight: "600",
  },
  quantity: {
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: "500",
  },
  removeButton: {
    padding: 8,
  },
  removeButtonText: {
    fontSize: 24,
    color: "#EF4444",
    fontWeight: "600",
  },
  summarySection: {
    backgroundColor: "#FFFFFF",
    marginTop: 16,
    paddingVertical: 16,
    marginBottom: 100,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#4B5563",
  },
  summaryValue: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "500",
  },
  totalRow: {
    marginTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E7EB",
    paddingTop: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#059669",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E7EB",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  checkoutButton: {
    backgroundColor: "#3B82F6",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#6B7280",
    marginBottom: 16,
  },
  continueShoppingButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  continueShoppingText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Checkout;
