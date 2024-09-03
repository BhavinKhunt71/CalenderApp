import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native"; // Import NavigationContainer
import BottomOptions from "@/components/BottomOptions";
import Drawers from "@/components/Drawers";
import { NavigationProvider } from "../../NavigationContext";
import { StatusBar } from "expo-status-bar";

const App = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer independent={true}>
        <StatusBar backgroundColor={"#fff"} />
        <NavigationProvider>
          <Drawers />
          <BottomOptions />
        </NavigationProvider>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height:"100%"
  },
});

export default App;
