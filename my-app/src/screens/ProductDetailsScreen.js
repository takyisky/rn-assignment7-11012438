import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchProductDetails } from '../services/api';

const ProductDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProductDetails = async () => {
      const data = await fetchProductDetails(id);
      setProduct(data);
    };

    getProductDetails();
  }, [id]);

  const addToCart = async () => {
    try {
      let cart = await AsyncStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      cart.push(product);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (!product) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.title}</Text>
      <Text>{product.description}</Text>
      <Text>${product.price}</Text>
      <Button title="Add to Cart" onPress={addToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default ProductDetailScreen;