import FloatingCart from '@/components/FloatingCart/FloatingCart';
import ProductList from '@/components/productList/productList';
import { CartProvider } from '@/context/CartContext';
import { Text, View, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
export default function home() {
  return (
    <CartProvider>
         {/* <View style={{alignItems : "flex-end"}}>
            <View style={styles.cartCount} >
                <Text style={styles.cartNumber}> 8 </Text>
            </View>
            <Feather name="shopping-cart" size={24} color="black" />
      </View> */}
      <View style={styles.container}>
        <View style={styles.content}>
          <ProductList />
        </View>

        <FloatingCart />
      </View>
     
    </CartProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    marginHorizontal:22
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCount :{
    position : "absolute",
    bottom : 16,
    width : 16, 
    height : 16 ,
    borderRadius : 8, 
    alignItems : "center",
    backgroundColor:"green",
    justifyContent:"center",
    zIndex: 999
  },
  cartNumber: {
    fontWeight:"600",
    fontSize: 10,
  }
});