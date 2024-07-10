import React, { useState } from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerActions } from '@react-navigation/native';
import ProductItem from '../components/ProductItems';


//Products
const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([
    { 
      id: '1',
      image: require("../../assets/dress1.png"),
      title: 'Office Wear', 
      type: 'reversible angora cardigan', 
      amount: '$200',
    },
    { 
      id: '2',
      image: require("../../assets/dress2.png"),
      title: 'Black ', 
      type: 'reversible angora cardigan', 
      amount: '$200',
    },
    { 
      id: '3',
      image: require("../../assets/dress3.png"),
      title: 'Church Wear', 
      type: 'reversible angora cardigan', 
      amount: '$200',
    },
    { 
      id: '4',
      title: 'Lamerei',
      image: require("../../assets/dress4.png"),
      type: 'reversible angora cardigan', 
      amount: '$200',
    },
    { 
      id: '5',
      image: require("../../assets/dress5.png"),
      title: '21WN ', 
      type: 'reversible angora cardigan', 
      amount: '$200',
    },
    { 
      id: '6',
      image: require("../../assets/dress6.png"),
      title: 'Lopo', 
      type: 'reversible angora cardigan', 
      amount: '$200',
    },
    { 
      id: '7',
      image: require("../../assets/dress7.png"),
      title: '21WN ', 
      type: 'reversible angora cardigan', 
      amount: '$200',
    },
    { 
      id: '8',
      image: require("../../assets/dress2.png"),
      title: 'Lame', 
      type: 'reversible angora cardigan', 
      amount: '$200',
    },

  ]);

  const addToCart = async (product) => {
    try {
      let cart = await AsyncStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      cart.push(product);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Navigation bar */}
      <View style={styles.navbarcontainer}>

        <View>
          {/* Drawer image  */}
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Image source={require("../../assets/Menu.png")} />
          </TouchableOpacity>
        </View>
        <View>
          <Image source={require("../../assets/Logo.png")} />
        </View>
        <View style={styles.search}>
          <Image source={require("../../assets/Search.png")} style = {{marginRight:25, marginLeft:-25,}} />
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image source={require("../../assets/shoppingBag.png")} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Under Navigation Bar */}
      <View style={styles.belownavbarcontainer}>
        <View>
          <Text style={styles.ourstorytxt} >OUR STORY</Text>
        </View>
        <View style={styles.filter}>

          <View style={{height:40, width:40, backgroundColor:'#D9DDDC', alignItems:'center', justifyContent:'center', borderRadius:100, }} >
            <Image source={require("../../assets/Listview.png")} />
          </View>
          <View style={{height:40, width:40, backgroundColor:'#D9DDDC', alignItems:'center', justifyContent:'center', borderRadius:100 }} >
            <Image source={require("../../assets/Filter.png")} />
          </View>

        </View>
      </View>

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductItem product={item} onAddToCart={() => addToCart(item)} />
        )}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  //The Nav Bar
  navbarcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 22,
    marginVertical: 35,
    alignItems:'center',
  },

  // The Search Button And the bag icon
  search: {
    flexDirection: 'row',
  },

  // Things below the nav bar
  belownavbarcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    marginHorizontal: 18,
    marginVertical: 10,
  },

  // Filter and the list view
  filter: {
    flexDirection: 'row',
    gap: 10,
  },

  //Display of Content
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },

  // Our Story Text
  ourstorytxt:{
    fontWeight:'bold',
    
  },
});
