import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchProductDetails } from '../services/api';
import { DrawerActions } from '@react-navigation/native'; // Import DrawerActions for navigation

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
      {/* Navigation bar */}
      <View style={styles.navbarcontainer}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Image source={require("../../assets/Menu.png")} style={styles.navbarIcon} />
        </TouchableOpacity>
        <Image source={require("../../assets/Logo.png")} style={styles.navbarIcon} />
        <View style={styles.search}>
          <Image source={require("../../assets/Search.png")} style={[styles.navbarIcon, styles.searchIcon]} />
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image source={require("../../assets/shoppingBag.png")} style={styles.navbarIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <View style={styles.productImageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
          />
        </View>

        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.description}>Do not use bleach</Text>
        <Text style={styles.description}>Do not tumble dry</Text>
        <Text style={styles.description}>Dry clean with tetrachloroethylene</Text>
        <Text style={styles.description}>Iron at a maximum of 110ºC/230ºF</Text>

        <Button title="Add to Cart" onPress={addToCart} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  navbarcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 22,
    marginVertical: 35,
    alignItems: 'center',
  },
  search: {
    flexDirection: 'row',
  },
  navbarIcon: {
    width: 24,
    height: 24,
  },
  searchIcon: {
    marginRight: 25,
    marginLeft: -25,
  },
  productImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  productImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default ProductDetailScreen;
