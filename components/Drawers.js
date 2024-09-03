import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import YearPage from '../screens/YearPage';
import MonthPage from '../screens/MonthPage';
import EventsPage from './EventPage';
import CustomHeader from './CustomHeader';
import search from './search';
import PublicHoliday from '../screens/publicHoliday';
import SelectCountry from '../screens/SelectCountry';
const Drawer = createDrawerNavigator();

const Drawers = () => {
  return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        drawerStyle={{ width: 294 }}
        screenOptions={{ header: () => <CustomHeader /> }}
      >
        <Drawer.Screen name="Year" component={YearPage} />
        <Drawer.Screen name="Month" component={MonthPage} />
        <Drawer.Screen name="Events" component={EventsPage} />
        <Drawer.Screen name="Search" component={search} />
        <Drawer.Screen name="Public Holiday" component={PublicHoliday} />
        <Drawer.Screen name="Select Country" component={SelectCountry} />
      </Drawer.Navigator>
  );
};

export default Drawers;
