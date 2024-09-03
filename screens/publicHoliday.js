import React, { useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import { useNavigationContext } from "../NavigationContext";
import uuid from "react-native-uuid";

const windowWidth = Dimensions.get("window").width;
const containerWidthPercentage = 90;

const EventList = () => {
  const [holidays, setHolidays] = React.useState([]);
  const [loading, setLoading] = React.useState(true); // Loading state
  const [error, setError] = React.useState(null); // Error state
  const { selectedCountry } = useNavigationContext();
  const date = new Date().getFullYear();

  useEffect(() => {
    async function fetchHolidays() {
      const url = `https://calendarific.com/api/v2/holidays?&api_key=hqheYRNAGyZNBD6unm750hOuha8VuoOT&country=${selectedCountry.value}&year=${date}&&type=national`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.response.holidays; // Adjust this based on the actual structure of the returned data
      } catch (error) {
        console.error("Error fetching holidays:", error);
        setError("Failed to load holidays. Please try again later.");
        return null;
      }
    }

    fetchHolidays().then((holidays) => {
      if (holidays) {
        holidays = holidays.map((obj) => ({
          ...obj,
          id: uuid.v4().toString(),
        }));
        setHolidays(holidays);
      }
      setLoading(false); // Set loading to false when data is fetched or an error occurs
    });
  }, [selectedCountry]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#07967A" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.yearCountryContainer}>
        <Text style={styles.yearText}>{date}</Text>
        <Text style={styles.countryText}>{selectedCountry.label}</Text>
      </View>
      <FlatList
        contentContainerStyle={{
          alignItems: "center",
          backgroundColor: "#FFFFFF",
        }}
        data={holidays}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.ctn}>
            <View style={styles.leftContainer}>
              <View style={styles.leftCornerBox}></View>
            </View>
            <View style={styles.middleContainer}>
              <Text style={styles.eventTitle}>{item.name}</Text>
              <View style={styles.rightContainer}>
                <View style={styles.greenSquare}></View>
                <Text style={styles.eventTime}>{item.date.iso}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#07967A",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  yearCountryContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "auto",
    backgroundColor: "#07967A",
    opacity: 0.5,
    borderRadius: 7,
  },
  yearText: {
    fontSize: 14,
    lineHeight: 24,
    paddingVertical: 8,
    paddingHorizontal: 26,
    color: "black",
  },
  countryText: {
    fontSize: 14,
    lineHeight: 24,
    paddingVertical: 8,
    paddingHorizontal: 26,
    color: "black",
    backgroundColor: "#07967A",
    borderRadius: 7,
  },
  ctn: {
    width: (windowWidth * containerWidthPercentage) / 100,
    height: 90,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#07967A",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    marginTop: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  middleContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 70,
  },
  leftContainer: {
    flexDirection: "row",
  },
  leftCornerBox: {
    width: 20,
    height: 89,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: "#07967A",
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  rightContainer: {
    flexDirection: "row",
  },
  greenSquare: {
    width: 10,
    height: 10,
    backgroundColor: "#07967A",
    borderRadius: 2,
    marginTop: 10,
    marginRight: 5,
  },
  eventTime: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
});

export default EventList;
