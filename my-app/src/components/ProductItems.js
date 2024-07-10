import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import { ImageBackground } from 'react-native';

const ProductItem = ({ product, onAddToCart }) => {
  return (
    <View style={styles.itemContainer}>
      <ImageBackground
        source={product.image}
        style={styles.itemimage}
      >
        {/* Add to cart button */}
        <TouchableOpacity style={[styles.addtocartbutton, styles.bottomRight]} onPress={onAddToCart}>
          <ImageBackground
            source={require('../../assets/add_circle.png')}
            style={styles.addtocartbuttonImage}
          />
        </TouchableOpacity>
        
      </ImageBackground>
      <Text style={styles.titletxt}>{product.title}</Text>
      <Text style={styles.typetxt}>{product.type}</Text>
      <Text style={styles.amounttxt}>{product.amount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  //Whole container
  itemContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
    alignItems: 'center',
  },
  //Image container
  itemimage: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    width: 250,
    height: 350,
  },

  //Add to cart button
  addtocartbutton: {
    width: 50,
    height: 50,
    position: 'absolute',
  },

  //Secondary styles that send the button to the bottom right.
  bottomRight: {
    bottom: 10,
    right: 10,
  },
  // Add to cart button image
  addtocartbuttonImage: {
    width: 50,
    height: 50,
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

export default ProductItem;
