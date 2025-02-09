import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useCart } from "@/context/CartContext";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { WebView } from "react-native-webview";
import { router } from "expo-router";

const Checkout = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [receiptHTML, setReceiptHTML] = useState("");

  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    clearCart,
  } = useCart();

  const generateReceiptHTML = () => {
    const subtotal = getTotalPrice();
    const total = subtotal;

    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .items-table th, .items-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .items-table th { background-color: #f4f4f4; }
            .total-section { text-align: right; font-size: 18px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Receipt</h1>
            <p>Date: ${new Date().toLocaleDateString()}</p>
          </div>
  
          <table class="items-table">
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
            ${cartItems
              .map(
                (item) => `
              <tr>
                <td>${item.productName}</td>
                <td>$${Number(item.productPrice).toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>$${(Number(item.productPrice) * item.quantity).toFixed(
                  2
                )}</td>
              </tr>
            `
              )
              .join("")}
          </table>
  
          <div class="total-section">
            <h3><strong>Total:</strong> $${total.toFixed(2)}</h3>
          </div>
        </body>
      </html>
    `;
  };
  const handlePlaceOrder = () => {
    // Add your order placement logic here
    clearCart();
    alert("Order placed successfully!");
    // Optionally navigate back to home or to an order confirmation page
    router.push("/home");
  };
  const previewReceipt = () => {
    const htmlContent = generateReceiptHTML();
    setReceiptHTML(htmlContent);
    setShowPreview(true);
  };

  const generateAndSharePDF = async () => {
    try {
      const file = await printToFileAsync({
        html: receiptHTML || generateReceiptHTML(),
        base64: false,
      });

      await shareAsync(file.uri);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate the PDF.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Checkout</Text>
          <Text style={styles.itemCount}>({cartItems.length} items)</Text>
        </View>

        <View style={styles.cartSection}>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <View key={item.productId} style={styles.cartItem}>
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
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.emptyCart}>
              <Text style={styles.emptyCartText}>Your cart is empty.</Text>
              <TouchableOpacity
                style={styles.analyticsButton}
                onPress={() => router.push("/StatisticsScreen")}
              >
                <Text style={styles.analyticsButtonText}>Show Analytics</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.previewButton}
            onPress={previewReceipt}
          >
            <Text style={styles.previewButtonText}>Preview Bill</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => {
              generateAndSharePDF();
              handlePlaceOrder();
            }}
          >
            <Text style={styles.checkoutButtonText}>
              Place Order (${(getTotalPrice() * 1.1).toFixed(2)})
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal for Bill Preview */}
      <Modal visible={showPreview} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setShowPreview(false)}>
            <Text style={styles.closeModal}>Close</Text>
          </TouchableOpacity>
          <WebView
            originWhitelist={["*"]}
            source={{ html: receiptHTML }}
            style={{ flex: 1 }}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingTop: 16,
    marginHorizontal: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: 0.5,
  },
  itemCount: {
    fontSize: 14,
    color: "#64748b",
    marginLeft: 8,
    fontWeight: "600",
  },
  cartSection: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  cartItem: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
    lineHeight: 20,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#047857",
    marginTop: 2,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    padding: 4,
    alignSelf: "flex-start",
  },
  quantityButton: {
    backgroundColor: "#ffffff",
    borderRadius: 6,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  quantityButtonText: {
    fontSize: 16,
    color: "#334155",
    fontWeight: "600",
  },
  quantity: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
    marginHorizontal: 12,
  },
  removeButton: {
    padding: 8,
    backgroundColor: "#fecaca",
    borderRadius: 8,
    marginLeft: 8,
  },
  removeButtonText: {
    fontSize: 18,
    color: "#dc2626",
    fontWeight: "600",
  },
  footer: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 4,
  },
  previewButton: {
    backgroundColor: "#475569",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  previewButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  checkoutButton: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  checkoutButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 48,
  },
  closeModal: {
    fontSize: 16,
    color: "#2563eb",
    textAlign: "center",
    marginBottom: 12,
    fontWeight: "600",
    paddingVertical: 8,
  },
  emptyCart: {
    padding: 24,
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 16,
  },
  analyticsButton: {
    backgroundColor: "#e2e8f0",
    padding: 12,
    borderRadius: 8,
  },
  analyticsButtonText: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default Checkout;
