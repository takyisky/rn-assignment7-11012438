import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for local storage
import { DrawerActions } from '@react-navigation/native'; // Import DrawerActions for navigation
import { fetchProducts } from '../services/api'; // Import fetchProducts function from API service file

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]); // State to hold products fetched from API
  const [cartItems, setCartItems] = useState([]); // State to hold items in the cart

  // Fetch products from API on component mount
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts(); // Call API function to fetch products
        setProducts(data); // Set fetched products to state
      } catch (error) {
        console.error(error);
      }
    };

    getProducts(); // Call the function to fetch products
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Fetch cart items from AsyncStorage on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        let cart = await AsyncStorage.getItem('cart'); // Get cart items from AsyncStorage
        setCartItems(cart ? JSON.parse(cart) : []); // Parse and set cart items to state
      } catch (error) {
        console.error(error);
      }
    };
    fetchCartItems(); // Call the function to fetch cart items
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Function to add a product to the cart
  const addToCart = async (product) => {
    try {
      let cart = await AsyncStorage.getItem('cart'); // Get current cart items from AsyncStorage
      cart = cart ? JSON.parse(cart) : []; // Parse existing cart items or initialize empty array
      cart.push(product); // Add selected product to cart
      await AsyncStorage.setItem('cart', JSON.stringify(cart)); // Store updated cart items in AsyncStorage
      setCartItems(cart); // Update state with new cart items
    } catch (error) {
      console.error(error);
    }
  };

  // Function to break the title text into multiple lines
  const breakTitleIntoLines = (title) => {
    const maxLength = 20; // Maximum characters per line
    const lines = [];

    // Check if the title needs to be broken into multiple lines
    while (title.length > maxLength) {
      const line = title.substring(0, maxLength); // Extract the first maxLength characters for the current line
      lines.push(line); // Add the current line to the lines array
      title = title.substring(maxLength); // Remove the characters added to the current line from the title
    }

    // Add the remaining title as the last line
    if (title.length > 0) {
      lines.push(title);
    }

    return lines; // Return array of lines
  };

  return (
    <View style={styles.container}>
      {/* Navigation bar */}
      <View style={styles.navbarcontainer}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Image source={require("../../assets/Menu.png")} />
        </TouchableOpacity>
        <Image source={require("../../assets/Logo.png")} />
        <View style={styles.search}>
          <Image source={require("../../assets/Search.png")} style={{ marginRight: 25, marginLeft: -25 }} />
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image source={require("../../assets/shoppingBag.png")} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Under Navigation Bar */}
      <View style={styles.belownavbarcontainer}>
        <Text style={styles.ourstorytxt}>OUR STORY</Text>
        <View style={styles.filter}>
          <View style={styles.iconContainer}>
            <Image source={require("../../assets/Listview.png")} />
          </View>
          <View style={styles.iconContainer}>
            <Image source={require("../../assets/Filter.png")} />
          </View>
        </View>
      </View>

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { id: item.id })}>
            <View style={styles.itemContainer}>
              <ImageBackground
                source={{ uri: item.image }}
                style={styles.itemimage}
              >
                <TouchableOpacity style={[styles.addtocartbutton, styles.bottomRight]} onPress={() => addToCart(item)}>
                  <Image
                    source={require('../../assets/add_circle.png')}
                    style={styles.addtocartbuttonImage}
                  />
                </TouchableOpacity>
              </ImageBackground>
              
              <View style={styles.titleContainer}>
                {breakTitleIntoLines(item.title).map((line, index) => (
                  <Text key={index} style={styles.titletxt}>{line}</Text>
                ))}
              </View>
              
              <Text style={styles.typetxt}>{item.category}</Text>
              <Text style={styles.amounttxt}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
  },
  itemimage: {
    width: 210,
    height: 210,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  addtocartbutton: {
    width: 50,
    height: 50,
    position: 'absolute',
  },
  bottomRight: {
    bottom: 10,
    right: 10,
  },
  addtocartbuttonImage: {
    width: 50,
    height: 50,
  },
  titleContainer: {
    width: '100%',
    maxWidth: '100%',
    marginRight: 10,
    overflow: 'hidden',
  },
  titletxt: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontFamily: 'sans-serif-light',
  },
  typetxt: {
    textAlign: 'left',
    fontFamily: 'sans-serif-light',
  },
  amounttxt: {
    textAlign: 'left',
    color: 'red',
    fontFamily: 'sans-serif-light',
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
  belownavbarcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 18,
    marginVertical: 10,
  },
  filter: {
    flexDirection: 'row',
    gap: 10,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ourstorytxt: {
    fontWeight: 'bold',
  },
  iconContainer: {
    height: 40,
    width: 40,
    backgroundColor: '#D9DDDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
});

