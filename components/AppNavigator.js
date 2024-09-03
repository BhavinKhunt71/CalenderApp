// AppNavigator.js
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import YearPage from './YearPage';
import MonthPage from './MonthPage';
import search from './search'

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
      <Stack.Navigator>
        {/* <Stack.Screen name="Year" component={YearPage} /> */}
        {/* <Stack.Screen name="Month" component={MonthPage} /> */}
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>

  );
};

export default AppNavigator;
