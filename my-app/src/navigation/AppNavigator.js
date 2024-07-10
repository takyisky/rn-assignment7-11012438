import React, { useState } from 'react';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProductDetailScreen from '../screens/ProductDetailsScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';


const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleStateChange = (state) => {
    const isDrawerOpen = state.history.some(item => item.type === 'drawer');
    setIsDrawerOpen(isDrawerOpen);
  };

  return (
    <NavigationContainer onStateChange={handleStateChange}>
      <Drawer.Navigator

        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerTitle: isDrawerOpen ? '' : '',
          headerShown: false,
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Cart" component={CartScreen} />
        {/* <Drawer.Screen name="ProductDetail" component={ProductDetailScreen} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
