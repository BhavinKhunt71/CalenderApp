// CustomHeader.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Button,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useNavigationContext } from "../NavigationContext";
const CustomHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { setShowJumpToDatePopup, selectedOption } = useNavigationContext();

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const openSearchComponent = () => {
    navigation.navigate("Search"); // 'Search' should match the name of your search component's route
  };

  const openJumpToDatePopup = () => {
    setShowJumpToDatePopup(true);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={openDrawer} style={styles.iconContainer}>
        <Image
          source={require("../assets/icon/drawer.png")} // Replace with your icon source
          style={
            selectedOption == "Year" ||
            selectedOption == "Month" ||
            selectedOption == "Events"
              ? styles.icon
              : styles.cioni
          }
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>
        {selectedOption == "Year" || selectedOption == "Month"
          ? "Calendar"
          : selectedOption}
      </Text>
      <View style={styles.iconSpContanier}>
        {route.name === "Month" && (
          <>
            <TouchableOpacity
              onPress={openSearchComponent}
              style={styles.iconContainer}
            >
              <Image
                source={require("../assets/icon/search.png")} // Replace with your search icon source
                style={styles.iconsearch}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openJumpToDatePopup}
              style={styles.iconContainer}
            >
              <Image
                source={require("../assets/icon/pencil.png")} // Replace with your pencil icon source
                style={styles.iconpencil}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 7,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    backgroundColor: "white",
  },
  headerText: {
    color: "#000",
    fontSize: 22,
    fontWeight: "bold",
    justifyContent: "center",
  },
  iconContainer: {
    padding: 5,
  },
  cioni: {
    width: 24,
    height: 24,
    marginLeft: 10,
    objectFit: "contain",
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
    objectFit: "contain",
  },
  iconsearch: {
    width: 20,
    height: 20,
    marginTop: 7,
    objectFit: "contain",
  },
  popup: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },

  popupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  datePicker: {
    width: 200, // Adjust the width as needed
    marginBottom: 10,
  },
  iconSpContanier: {
    flexDirection: "row",
    gap: 8,
  },
  iconpencil: {
    width: 20,
    height: 20,
    marginTop: 7,
  },
});

export default CustomHeader;
