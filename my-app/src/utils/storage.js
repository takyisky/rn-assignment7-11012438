//Local saving mechanism

import AsyncStorage from '@react-native-async-storage/async-storage';

// adding to cart
export const addToCart = async (product) => {
  try {
    let cart = await AsyncStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    cart.push(product);
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error(error);
  }
};

// removing from cart
export const removeFromCart = async (product) => {
  try {
    let cart = await AsyncStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    cart = cart.filter((item) => item.id !== product.id);
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error(error);
  }
};

// getting items in cart
export const getCartItems = async () => {
  try {
    let cart = await AsyncStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};