import React, { useState, useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { CalendarList, LocaleConfig } from "react-native-calendars";

LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  today: "Today",
};

LocaleConfig.defaultLocale = "en";

const generateUniqueKey = () => {
  return Math.random().toString(36).substring(7);
};

const YearPage = () => {
  const ref = useRef();
  const currentYear = new Date().getFullYear(); // Get the current year
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [currentDates, setCurrentDates] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState("");
  const [calendarKey, setCalendarKey] = useState(0); // Add a state for the calendar key
  const handleIncrementYear = useCallback(() => {
    setSelectedYear(selectedYear + 1);
    setCalendarKey(calendarKey + 1); // Update the calendar key to force re-render
  }, [selectedYear]);

  const handleDecrementYear = useCallback(() => {
    setSelectedYear(selectedYear - 1);
    setCalendarKey(calendarKey + 1); // Update the calendar key to force re-render
  }, [selectedYear]);

  // Define the date marking for Sundays
  const markedDates = useMemo(() => {
    const result = {};
    for (let month = 1; month <= 12; month++) {
      const currentDate = new Date(selectedYear, month - 1);
      while (currentDate.getMonth() === month - 1) {
        // if (currentDate.getDay() === 1) {
        //   const formattedDate = currentDate.toISOString().split("T")[0];
        //   result[formattedDate] = {
        //     marked: true,
        //     dotColor: "white",
        //     color: "white",
        //     selectedDotColor: "white",
        //     selected: true,
        //     selectedColor: "white",
        //   };
        // }
        if (currentDate.getDay() === 1) {
          result[currentDate.toISOString().split("T")[0]] = {
            customStyles: {
              container: {
                backgroundColor: "white",
              },
              text: {
                color: "red",
              },
            },
          };
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    result["2023-12-31"] = {
      marked: true,
      dotColor: "white",
      color: "white",
      selectedDotColor: "white",
      selected: true,
      selectedColor: "white",
    };
    return result;
  }, [selectedYear]);

  const handleDayPress = (day) => {
    setSelectedDay(day.dateString);
  };

  return (
    <View style={styles.container}>
      <View style={styles.yearContainer}>
        <TouchableOpacity
          onPress={handleDecrementYear}
          style={styles.touchable}
        >
          <Image
            source={require("../assets/icon/decreaseYear.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.yearText}>{selectedYear}</Text>
        <TouchableOpacity
          onPress={handleIncrementYear}
          style={styles.touchable}
        >
          <Image
            source={require("../assets/icon/increaseYear.png")}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <CalendarList
        key={calendarKey} // Set a unique key to force re-render
        current={`${selectedYear}-01-01`}
        minDate={`${selectedYear}-01-01`}
        maxDate={`${selectedYear}-12-31`}
        horizontal={false}
        pastScrollRange={0}
        futureScrollRange={11}
        monthFormat={"MMM"}
        hideExtraDays={true}
        selected={true}
        // markedDates={markedDates} // Pass the marked dates
        firstDay={0} // 0 is Sunday, 1 is Monday, etc.
        theme={{
          "stylesheet.calendar.header": {
            dayTextAtIndex0: {
              color: "#07967A",
            },
          },
        }}
        markingType={"custom"}
        markedDates={{
          ...markedDates,
          [currentDates.toISOString().split("T")[0]]: {
            customStyles: {
              container: {
                backgroundColor: selectedDay ? null : "#07967A",
                borderRadius: 20,
              },
              text: {
                color: selectedDay ? "#07967A" : "white",
              },
            },
          },
          [selectedDay]: {
            selected: true,
            selectedColor: "#07967A",
          },
        }}
        onDayPress={handleDayPress}
        onDayLongPress={handleDayPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 10,
  },
  yearContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 0,
    backgroundColor: "white",
  },
  touchable: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 20,
    height: 20,
  },
  yearText: {
    fontSize: 20,
    marginHorizontal: 50,
  },
});

export default YearPage;
