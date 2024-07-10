import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

const CustomDrawerContent = ({ navigation }) => {
  return (
    <View style={styles.drawerContent}>
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.closeDrawer())} style={styles.closeButton}>
        <Image source={require('../../assets/Close.png')} style={styles.closeButtonImage }/>
      </TouchableOpacity>


      <View style={styles.usernameandhorizontallineview} >
        <Text style={styles.username } >Eric Atsu</Text>
        
        {/* Bar below the eric Atsu name  */}
        <View style={styles.drawerbarhorizontalline }></View>

      </View>
      

      <Text style={styles.drawerbartextlink } >Store</Text>
      <Text style={styles.drawerbartextlink } >Locations</Text>
      <Text style={styles.drawerbartextlink } >Blog</Text>
      <Text style={styles.drawerbartextlink } >Jewelery</Text>
      <Text style={styles.drawerbartextlink } >Electronics</Text>
      <Text style={styles.drawerbartextlink } >Clothing</Text>

    </View>
  );
};

const styles = StyleSheet.create({


    drawerContent: {
        flex: 1,
        padding: 20,
    },

    //Close button image 
    closeButtonImage :{
        height :40,
        width:40,
    },

    //Close button touchable opacity 
    closeButton: {
        alignSelf: 'flex-start',
        marginVertical:23, 
    },

    usernameandhorizontallineview:{
        alignContent:'center',
        marginBottom:20,
    },

    username:{
        fontFamily:'sans-serif-light',
        marginLeft:10,
        fontSize: 17,
    },


    drawerbarhorizontalline :{
        height:1,
        backgroundColor:'red',
        width:90,
        marginLeft:10,
        marginTop:5,
        
    },

    drawerbartextlink :{
        textAlign: 'left',
        width: '100%',
        marginLeft:10,
        fontFamily:'sans-serif-light',
        marginVertical:10,
        fontSize: 17,
    },

});

export default CustomDrawerContent;
