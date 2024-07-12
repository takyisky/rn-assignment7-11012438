import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  // Fetches the items from local storage
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        let cart = await AsyncStorage.getItem('cart');
        setCartItems(cart ? JSON.parse(cart) : []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCartItems();
  }, []);

  // Removes an item from the cart
  const removeFromCart = async (product) => {
    try {
      let cart = await AsyncStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      cart = cart.filter((item) => item.id !== product.id);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      setCartItems(cart);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Navigation Bar */}
        <View style={styles.cartnavbar}>
          <Text> </Text>
          <Image source={require("../../assets/Logo.png")} />
          <Image source={require("../../assets/Search.png")} />
        </View>

        <Text style={styles.checkoutHeader}>C H E C K   O U T</Text>

        {/* Horizontal bar */}
        <View style={styles.horizontalbar} />

        {/* Render items in the cart */}
        <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <View style={styles.cartitemcontainer}>
              <View>
                <Image source={{ uri: item.image }} style={{ width: 120, height: 120 }} />
              </View>
              <View style={styles.cartiteminnercontainer}>
                <View>
                  <Text style={styles.titletxt}>{item.title}</Text>
                  <Text style={styles.typetxt}>{item.category}</Text>
                  <Text style={styles.amounttxt}>{item.price} </Text>
                </View>
                <View style={styles.cartiteminnercontainer2}>
                  <TouchableOpacity onPress={() => removeFromCart(item)} style={styles.removeitembutton}>
                    <Image source={require("../../assets/remove.png")} style={styles.removeButtonImage} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.cartItemsContainer}
        />

        {/* Cart Bottom Footer */}
        <View style={styles.totalamountcontainer}>
          <Text style={styles.esttotaltxt}>EST. TOTAL</Text>
          <Text style={styles.estamounttxt}>$240</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.checkoutbutton}>
            <Image source={require("../../assets/shoppingBag.png")} />
            <Text> CHECKOUT </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cartnavbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    paddingHorizontal: 30,
  },
  horizontalbar: {
    height: 3,
    backgroundColor: 'black',
    alignSelf: 'center',
    width: '40%',
    marginVertical: 10,
  },
  checkoutHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  cartitemcontainer: {
    flexDirection: "row",
    marginHorizontal: 30,
    marginVertical: 30,
  },
  cartiteminnercontainer: {
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
    width: '55%',
  },
  esttotaltxt: {
    fontWeight: 'bold',
  },
  estamounttxt: {
    fontWeight: 'bold',
    color: 'red',
  },
  removeButtonImage: {
    width: 20,
    height: 20,
  },
  cartiteminnercontainer2: {
    alignItems: 'flex-end',
  },
  totalamountcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
    paddingVertical: 10,
    alignItems: 'center',
  },
  checkoutbutton: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
    backgroundColor: 'gray',
    paddingVertical: 20,
    marginTop: 10,
  },
  titletxt: {
    textAlign: 'left',
    width: '100%',
    marginLeft: 10,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-light',
  },
  typetxt: {
    textAlign: 'left',
    width: '100%',
    marginLeft: 10,
    fontFamily: 'sans-serif-light',
  },
  amounttxt: {
    textAlign: 'left',
    width: '100%',
    marginLeft: 10,
    color: 'red',
    fontFamily: 'sans-serif-light',
  },
});
