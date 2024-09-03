import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNavigationContext } from '../NavigationContext';
const BottomOptions = () => {
  const navigation = useNavigation();
  // const [selectedOption, setSelectedOption] = useState('Year'); // Initialize with 'Year'
  const { selectedOption, setSelectedOption } = useNavigationContext();
  const navigateToYearPage = () => {
    navigation.navigate('Year');
    setSelectedOption('Year'); // Set the selected option to 'Year'
  };

  const navigateToMonthPage = () => {
    navigation.navigate('Month');
    setSelectedOption('Month'); // Set the selected option to 'Month'
  };

  const navigateToEventsPage = () => {
    navigation.navigate('Events');
    setSelectedOption('Events'); // Set the selected option to 'Events'
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.option,
          // selectedOption === 'Year' && { backgroundColor: '#07967A' },
        ]}
        onPress={navigateToYearPage}
      >
        <Image source={require('../assets/icon/year-icon.png')} style={selectedOption === 'Year' ? [styles.icon, styles.iconSelected] : styles.icon} />
        <Text style={selectedOption === 'Year' && { color: '#07967A' }}>Year</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          // selectedOption === 'Month' && { backgroundColor: '#07967A' },
        ]}
        onPress={navigateToMonthPage}
      >
        <Image source={require('../assets/icon/month-icon.png')} style={selectedOption === 'Month' ? [styles.icon, styles.iconSelected] : styles.icon} />
        <Text style={selectedOption === 'Month' && { color: '#07967A' }}>Month</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          // selectedOption === 'Events' && { backgroundColor: '#07967A'},
        ]}
        onPress={navigateToEventsPage}
      >
        <Image source={require('../assets/icon/event-icon.png')} style={selectedOption === 'Events' ? [styles.icon, styles.iconSelected] : styles.icon} />
        <Text style={selectedOption === 'Events' && { color: '#07967A' }}>Events</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingBottom: 5,
    paddingTop: 5,
    shadowOffset:5
    // zIndex:-1
  },
  option: {
    alignItems: 'center',
    padding: 7,
    borderRadius: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 5,
    // tintColor: 'blue'
  },
  iconSelected:{
    tintColor: '#07967A'
  }
});

export default BottomOptions;
