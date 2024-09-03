import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Dimensions, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native'; // Import useIsFocused

const windowWidth = Dimensions.get("window").width;
const containerWidthPercentage = 90;

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isFocused = useIsFocused(); // Hook to check if the screen is focused

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const storedEvents = await AsyncStorage.getItem("events");
      if (storedEvents !== null) {
        setEvents(JSON.parse(storedEvents));
      } else {
        setError("No events found. Please add some events.");
      }
    } catch (err) {
      setError("Failed to load events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch events when the screen is focused
  useEffect(() => {
    if (isFocused) {
      fetchEvents();
    }
  }, [isFocused]);

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
      {events.length > 0 ? (
        <FlatList
          contentContainerStyle={{
            alignItems: "center",
            backgroundColor: "#FFFFFF",
          }}
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.ctn}>
              <View style={styles.leftContainer}>
                <View style={styles.leftCornerBox}></View>
              </View>
              <View style={styles.middleContainer}>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <View style={styles.rightContainer}>
                  <View style={styles.greenSquare}></View>
                  <Text style={styles.eventTime}>{`${item.startDate} - ${item.endDate}`}</Text>
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noEventsText}>No events to display.</Text>
      )}
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
  ctn: {
    width: (windowWidth * containerWidthPercentage) / 100,
    height: 80,
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
    height: 80,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 10,
    backgroundColor: "#07967A",
  },
  eventTitle: {
    fontSize: 18,
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
  noEventsText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
  },
});

export default EventList;
