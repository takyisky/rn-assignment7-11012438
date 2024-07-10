import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  //Saves the item on the local storage
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

  //Function that removes an item from the cart.
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
    //Design
    <View style={styles.container}>
      {/* Navigation Bar */}
        <View style= {styles.cartnavbar}>
          <Text> </Text>
          <Image source={require("../../assets/Logo.png")}  />
          <Image source={require("../../assets/Search.png")} />
        </View>

      <Text style={styles.checkoutHeader}>C H E C K   O U T</Text>
      
      {/* Center the horizontalbar */}
      <View style={styles.horizontalbar}/>

      {/* What renders the items to the HomeScreen */}
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <View>
            

            <View style={styles.cartitemcontainer}>

              <View><Image source={item.image}></Image></View>
              <View style={styles.cartiteminnercontainer} >
                <View><Text> </Text></View>

                <View>
                  <View><Text style={styles.titletxt} >{item.title}</Text></View>
                  <View><Text style={styles.typetxt} >{item.type}</Text></View>
                  <View><Text style={styles.amounttxt} >{item.amount}</Text></View>
                </View>
                <View style={styles.cartiteminnercontainer2} >
                  <TouchableOpacity onPress={() => removeFromCart(item)} style={styles.removeitembutton}>
                    <Image source={require("../../assets/remove.png")} style={styles.removeButtonImage}></Image>
                  </TouchableOpacity>
                </View>
                
              </View>

            </View>
            
          </View>
          
          
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cartItemsContainer}
        
      />

      {/* Cart Bottom Footer */}
      <View style={styles.totalamountcontainer} >
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
    
  );
};

export default CartScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // The Navigation Bar in the cart screen.
  cartnavbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin:10,
    paddingHorizontal:30,
  },

  horizontalbar:{
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

  // A cart item container
  cartitemcontainer: {
    flexDirection: "row",
    marginHorizontal:30,
    marginVertical:30,
    justifyContent:''
  },
  cartiteminnercontainer:{
    justifyContent:'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
    width:'55%',
  },

  esttotaltxt:{
    fontWeight:'bold',
  },
  estamounttxt:{
    fontWeight:'bold',
    color:'red'
  },

  removeButtonImage: {
    width: 20,
    height: 20,
  },
  cartiteminnercontainer2:{
    alignItems: 'flex-end',
  },

  //total amount section
  totalamountcontainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
    paddingVertical:10,
    alignItems:'center'
  },
  
  //checkout button
  checkoutbutton: {
    flexDirection: "row",
    justifyContent: "center",
    gap:10,
    alignItems: "center",
    backgroundColor:'gray',
    paddingVertical: 20,
    marginVertical:10,
  },
  //Title text
  titletxt:{
    textAlign: 'left',
    width: '100%',
    marginLeft:10,
    fontWeight:'bold',
    fontFamily:'sans-serif-light' 
  },
  //Title of item text
  typetxt:{
    textAlign: 'left',
    width: '100%',
    marginLeft:10,
    fontFamily:'sans-serif-light'
  },

  //Amount cost of item text
  amounttxt: {
    textAlign: 'left',
    width: '100%',
    marginLeft:10,
    color: 'red',
    fontFamily:'sans-serif-light'
  },

  
  
  

});
