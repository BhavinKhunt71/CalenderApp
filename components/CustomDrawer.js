// CustomDrawer.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigationContext } from '../NavigationContext'; // Import the useNavigationContext hook

const CustomDrawer = (props) => {
  const { selectedOption, setSelectedOption } = useNavigationContext(); // Access the selected option state

  const handleMenuItemPress = (option) => {
    setSelectedOption(option); // Update the selected option state
    props.navigation.navigate(option); // Navigate to the selected page
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Image
          source={require('../assets/image/drawer-image.png')} // Replace with your image source
          style={styles.headerImage}
        />
        <TouchableOpacity
          style={[
            styles.menuItem,
            // selectedOption === 'Year' && { backgroundColor: '#07967A' },
          ]}
          onPress={() => handleMenuItemPress('Year')}
        >
          <Image source={require('../assets/icon/year-icon.png')} style={selectedOption === 'Year' ? [styles.icon, styles.iconSelected] : styles.icon} />
        <Text style={selectedOption === 'Year' && { color: '#07967A' }}>Yearly View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuItem,
            // selectedOption === 'Month' && { backgroundColor: '#07967A' },
          ]}
          onPress={() => handleMenuItemPress('Month')}
        >
           <Image source={require('../assets/icon/month-icon.png')} style={selectedOption === 'Month' ? [styles.icon, styles.iconSelected] : styles.icon} />
        <Text style={selectedOption === 'Month' && { color: '#07967A' }}>Monthly View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuItem,
            // selectedOption === 'Events' && { backgroundColor: '#07967A' },
          ]}
          onPress={() => handleMenuItemPress('Events')}
        >
          <Image source={require('../assets/icon/event-icon.png')} style={selectedOption === 'Events' ? [styles.icon, styles.iconSelected] : styles.icon} />
        <Text style={selectedOption === 'Events' && { color: '#07967A'}}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuItem,
            // selectedOption === 'Events' && { backgroundColor: '#07967A' },
          ]}
          onPress={() => handleMenuItemPress('Public Holiday')}
        >
          <Image source={require('../assets/icon/traveler.png')} style={selectedOption === 'Public Holiday' ? [styles.icon, styles.iconSelected] : styles.icon} />
        <Text style={selectedOption === 'Public Holiday' && { color: '#07967A' }}>Public Holiday</Text>
        </TouchableOpacity>
        {/* Add more menu items here */}
        <TouchableOpacity
          style={[
            styles.menuItem,
            // selectedOption === 'Events' && { backgroundColor: '#07967A' },
          ]}
          onPress={() => handleMenuItemPress('Select Country')}
        >
          <Image source={require('../assets/icon/country-icon.png')} style={selectedOption === 'Select Country' ? [styles.icon, styles.iconSelected] : styles.icon} />
        <Text style={selectedOption === 'Select Country' && { color: '#07967A' }}>Select Country</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 294,
    paddingTop: 24,
    paddingLeft: 16,
    paddingRight: 16,
    // borderRadius:10
  },
  headerImage: {
    width: 294,
    height: 250,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 16,
    marginLeft:10,
    // borderRadius:5
  },
  iconSelected:{
    tintColor: '#07967A'
  }
});

export default CustomDrawer;
