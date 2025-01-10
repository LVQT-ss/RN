import ProductList from '@/components/productList/productList';
import { Text, View, StyleSheet } from 'react-native';

export default function home() {
  return (
    <View style={styles.container}>
    <ProductList />
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
