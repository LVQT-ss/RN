// FloatingCart.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { useCart } from "@/context/CartContext";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const FloatingCart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);

  if (cartItems.length === 0) return null;

  return (
    <View style={[
      styles.floatingContainer,
      isExpanded && styles.expandedContainer,
      Platform.select({
        android: styles.androidShadow,
      })
    ]}>
      <TouchableOpacity 
        style={styles.cartHeader}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <Text style={styles.cartTitle}>Cart ({cartItems.length} items)</Text>
        <Text style={styles.totalPrice}>${getTotalPrice().toFixed(2)}</Text>
      </TouchableOpacity>

      {isExpanded && (
        <>
          <ScrollView 
            style={styles.cartItems}
            showsVerticalScrollIndicator={false}
          >
            {cartItems.map((item) => (
              <View key={item.productId} style={styles.cartItem}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.itemImage}
                  contentFit="cover"
                  transition={200}
                />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.productName}
                  </Text>
                  <Text style={styles.itemPrice}>
                    ${(item.productPrice * item.quantity).toFixed(2)}
                  </Text>
                  <View style={styles.quantityControl}>
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.productId, item.quantity - 1)}
                      style={styles.quantityButton}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.productId, item.quantity + 1)}
                      style={styles.quantityButton}
                      activeOpacity={0.7}
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
          </ScrollView>

          <TouchableOpacity 
            style={styles.checkoutButton}
            activeOpacity={0.7}
          >
            <Text style={styles.checkoutButtonText}>
              Checkout (${getTotalPrice().toFixed(2)})
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    top: Platform.select({ ios: 60, android: 40 }), // Adjusted for status bar
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    maxHeight: '80%',
    width: SCREEN_WIDTH - 40,
  },
  expandedContainer: {
    maxHeight: '80%',
  },
  iosShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  androidShadow: {
    elevation: 8,
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  cartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
  },
  cartItems: {
    maxHeight: '60%',
  },
  cartItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
    alignItems: 'center',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
    marginTop: 4,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    width: 24,
    height: 24,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    color: '#4B5563',
    fontWeight: '600',
    lineHeight: 20,
  },
  quantity: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: '500',
  },
  removeButton: {
    padding: 8,
  },
  removeButtonText: {
    fontSize: 20,
    color: '#EF4444',
    fontWeight: '600',
  },
  checkoutButton: {
    backgroundColor: '#3B82F6',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FloatingCart;