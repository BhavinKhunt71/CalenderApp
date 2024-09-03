import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  FlatList,
  Platform,
} from "react-native";
import { Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigationContext } from "../NavigationContext";
import styles from "../components/stylesMonth";

const generateUniqueKey = () => {
  return Math.random().toString(36).substring(7);
};
const MonthPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarKey, setCalendarKey] = useState(generateUniqueKey());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState("");
  const [selectEventDate, setSelectedEventDate] = useState("");
  const [isEventModalVisible, setEventModalVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDescription, setEventDescription] = useState("");
  const [eventStartDate, setEventStartDate] = useState(new Date());
  const [eventEndDate, setEventEndDate] = useState(new Date());
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [events, setEvents] = useState([]);
  const [isEditDeleteModalVisible, setEditDeleteModalVisible] = useState(false);
  const [editEventId, setEditEventId] = useState("");
  const [editEventTitle, setEditEventTitle] = useState("");
  const [editEventDescription, setEditEventDescription] = useState("");
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const { showJumpToDatePopup, setShowJumpToDatePopup } =
    useNavigationContext();
  const [isshow, setIshowed] = useState(false);
  const loadEventsFromStorage = useCallback(async () => {
    try {
      const storedEvents = await AsyncStorage.getItem("events");
      if (storedEvents !== null) {
        setEvents(JSON.parse(storedEvents));
      }
    } catch (error) {
      console.error("Error loading events:", error);
    }
  }, []);
  useEffect(() => {
    const currentDateISO = currentDate.toISOString().split("T")[0];
    const currentDateEvents = events.filter((event) => {
      const eventStartDate = new Date(event.startDate);
      const eventEndDate = new Date(event.endDate);

      return (
        currentDateISO >= eventStartDate.toISOString().split("T")[0] &&
        currentDateISO <= eventEndDate.toISOString().split("T")[0]
      );
    });

    setEvents(currentDateEvents);
    setSelectedEventDate(currentDateISO);
    loadEventsFromStorage();
  }, [currentDate, loadEventsFromStorage]);

  const handleNextMonth = useCallback(() => {
    const nextMonth = new Date(selectedDate);
    nextMonth.setMonth(selectedDate.getMonth() + 1);
    setSelectedDate(nextMonth);
    if (currentDate != selectedDate) {
      setSelectedEventDate("");
    } else {
      setSelectedEventDate(currentDate.toString());
    }
    setCalendarKey(generateUniqueKey());
  }, [currentDate, selectedDate]);

  const handlePreviousMonth = useCallback(() => {
    const previousMonth = new Date(selectedDate);
    previousMonth.setMonth(selectedDate.getMonth() - 1);
    setSelectedDate(previousMonth);
    if (currentDate != selectedDate) {
      setSelectedEventDate("");
    } else {
      setSelectedEventDate(currentDate.toString());
    }
    setCalendarKey(generateUniqueKey());
  }, [currentDate, selectedDate]);

  const handleCurrentDate = useCallback(() => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentDate(today);
    setSelectedDay("");
    setSelectedEventDate(today.toISOString().split("T")[0]);
    setCalendarKey(generateUniqueKey());
  }, []);

  const toggleEventModal = useCallback(() => {
    setEventModalVisible(!isEventModalVisible);
  }, [isEventModalVisible]);

  const handleDayPress = (day) => {
    setSelectedDay(day.dateString);
    setSelectedEventDate(day.dateString);
    setCalendarKey(generateUniqueKey());
  };
  
  const handleJumpToDate = (event, sd) => {
    setShowJumpToDatePopup(false);
    setIshowed(Platform.OS === "ios");
    const year = sd.getFullYear();
    const month = String(sd.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so we add 1
    const day = String(sd.getDate()).padStart(2, "0");
    if (sd) {
      setSelectedDate(sd);
    }
    const y = `${year}-${month}-${day}`;
    setSelectedDay(y);
    setSelectedEventDate(y);
    setCalendarKey(generateUniqueKey());
  };
  const jumpToDate = () => {
    setIshowed(true);
  };
  const handleEventSubmit = () => {
    // Check if any of the mandatory fields are empty
    if (
      eventTitle.trim() === "" ||
      eventStartDate.toISOString().split("T")[0] === "" ||
      eventEndDate.toISOString().split("T")[0] === "" ||
      eventStartTime === "" ||
      eventEndTime === ""
    ) {
      // Display an error message or handle the validation error as needed
      alert("Please fill in all mandatory fields.");
      return; // Prevent event submission
    }

    const newEvent = {
      id: generateUniqueKey(),
      title: eventTitle,
      description: eventDescription,
      startDate: eventStartDate.toISOString().split("T")[0],
      endDate: eventEndDate.toISOString().split("T")[0],
      startTime: eventStartTime,
      endTime: eventEndTime,
    };

    // Add the new event to the existing events array
    const updatedEvents = [...events, newEvent];

    // Update the state with the new events
    setEvents(updatedEvents);

    // Save the updated events to AsyncStorage
    toggleEventModal();
    AsyncStorage.setItem("events", JSON.stringify(updatedEvents))
      .then(() => {
        setEventTitle("");
        setEventDescription("");
        setEventStartDate(new Date());
        setEventEndDate(new Date());
        setEventStartTime("");
        setEventEndTime("");
      })
      .catch((error) => {
        console.error("Error saving events:", error);
      });
  };
  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);

    // Update the state with the updated events
    setEvents(updatedEvents);

    // Save the updated events to AsyncStorage
    AsyncStorage.setItem("events", JSON.stringify(updatedEvents))
      .then(() => {
        setSelectedEvent(null);
      })
      .catch((error) => {
        console.error("Error saving events after deletion:", error);
      });
  };

  const toggleEditDeleteModal = () => {
    setEditDeleteModalVisible(!isEditDeleteModalVisible);
    setSelectedEvent(null);
  };

  const openEditDeleteModal = (eventId, title, description) => {
    setEditEventId(eventId);
    setEditEventTitle(title);
    setEditEventDescription(description);
    toggleEditDeleteModal();
  };

  // const showStartDatePickerAndroid = () => {
  //   setShowStartDatePicker(true);
  // };

  // const showEndDatePickerAndroid = () => {
  //   setShowEndDatePicker(true);
  // };

  const handleStartDateChange = (event, selecteddate) => {
    setShowStartDatePicker(Platform.OS === "ios");
    if (selecteddate) {
      setEventStartDate(selecteddate);
    }
  };

  const handleEndDateChange = (event, selecteddate) => {
    setShowEndDatePicker(Platform.OS === "ios");
    if (selecteddate) {
      setEventEndDate(selecteddate);
    }
  };

  const currentDayOfMonth = currentDate.getDate();
  const markedDates = useMemo(() => {
    const marked = {};
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();
    const startDate = new Date(currentYear, currentMonth, 1);
    const endDate = new Date(currentYear, currentMonth + 2, 1);

    for (
      let date = startDate;
      date < endDate;
      date.setDate(date.getDate() + 1)
    ) {
      if (date.getDay() === 1) {
        marked[date.toISOString().split("T")[0]] = {
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
    }
    return marked;
  }, [currentDate, selectedDate]);
  const [editEventStartDate, setEditEventStartDate] = useState(new Date());
  const [editEventEndDate, setEditEventEndDate] = useState(new Date());
  const [editEventStartTime, setEditEventStartTime] = useState("");
  const [editEventEndTime, setEditEventEndTime] = useState("");
  const [showEditStartDatePicker, setShowEditStartDatePicker] = useState(false);
  const [showEditEndDatePicker, setShowEditEndDatePicker] = useState(false);
  const [showEditStartTimePicker, setShowEditStartTimePicker] = useState(false);
  const [showEditEndTimePicker, setShowEditEndTimePicker] = useState(false);

  const openEditDate = (dateType) => {
    switch (dateType) {
      case "start":
        setShowEditStartDatePicker(true);
        break;
      case "end":
        setShowEditEndDatePicker(true);
        break;
    }
  };

  const openEditTime = (timeType) => {
    switch (timeType) {
      case "start":
        setShowEditStartTimePicker(true);
        break;
      case "end":
        setShowEditEndTimePicker(true);
        break;
    }
  };

  const handleEditStartDateChange = (event, selectedDate) => {
    setShowEditStartDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setEditEventStartDate(selectedDate);
    }
  };

  const handleEditEndDateChange = (event, selectedDate) => {
    setShowEditEndDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setEditEventEndDate(selectedDate);
    }
  };

  const handleEditStartTimeChange = (event, selectedDate) => {
    setShowEditStartTimePicker(Platform.OS === "ios");
    if (selectedDate) {
      const formattedTime = selectedDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setEditEventStartTime(formattedTime);
    }
  };

  const handleEditEndTimeChange = (event, selectedDate) => {
    setShowEditEndTimePicker(Platform.OS === "ios");
    if (selectedDate) {
      const formattedTime = selectedDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setEditEventEndTime(formattedTime);
    }
  };
  const editEvent = async (eventId, updatedEvent) => {
    try {
      // Retrieve the current list of events from AsyncStorage
      const storedEvents = await AsyncStorage.getItem("events");
      if (storedEvents !== null) {
        const parsedEvents = JSON.parse(storedEvents);

        // Find the index of the event to edit
        const eventIndex = parsedEvents.findIndex(
          (event) => event.id === eventId
        );

        if (eventIndex !== -1) {
          // Update the event with the new data
          parsedEvents[eventIndex] = {
            ...parsedEvents[eventIndex],
            ...updatedEvent,
          };

          // Save the updated events back to AsyncStorage
          await AsyncStorage.setItem("events", JSON.stringify(parsedEvents));

          // Update the state with the updated events
          setEvents(parsedEvents);

          // Optionally, close the edit/delete modal or perform any other actions
          toggleEditDeleteModal();
        }
      }
    } catch (error) {
      console.error("Error editing event:", error);
    }
  };

  // fetchHolidays();
  const handleEditEventSubmit = () => {
    // Check if any of the mandatory fields are empty
    if (
      editEventTitle.trim() === "" ||
      editEventStartDate.toISOString().split("T")[0] === "" ||
      editEventEndDate.toISOString().split("T")[0] === "" ||
      editEventStartTime === "" ||
      editEventEndTime === ""
    ) {
      // Display an error message or handle the validation error as needed
      alert("Please fill in all mandatory fields.");
      return; // Prevent event submission
    }

    // Convert start and end dates to Date objects
    const startDate = new Date(editEventStartDate);
    const endDate = new Date(editEventEndDate);
    // console.log(startDate != endDate)
    // console.log(endDate)
    if (
      startDate.getMonth() != endDate.getMonth() ||
      startDate.getDate() != endDate.getDate() ||
      startDate.getFullYear() != endDate.getFullYear()
    ) {
      if (startDate >= endDate) {
        // Display an error message indicating that the start date should be before the end date
        alert("Start date should be before the end date.");
        return; // Prevent event submission
      }
    }
    // Check if the start date is greater than or equal to the end date
    const updatedEvent = {
      title: editEventTitle,
      description: editEventDescription,
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      startTime: editEventStartTime,
      endTime: editEventEndTime,
    };

    // Call the editEvent function to update the event
    editEvent(editEventId, updatedEvent);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePreviousMonth} style={styles.button}>
          <Image
            source={require("../assets/icon/decreaseYear.png")}
            style={styles.arrow}
          />
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {selectedDate.toLocaleString("default", { month: "long" })}{" "}
          {selectedDate.getFullYear()}
        </Text>

        <TouchableOpacity onPress={handleNextMonth} style={styles.button}>
          <Image
            source={require("../assets/icon/increaseYear.png")}
            style={styles.arrow}
          />
        </TouchableOpacity>
      </View>

      <Calendar
        key={calendarKey}
        current={selectedDate.toISOString().split("T")[0]}
        hideExtraDays={true}
        renderHeader={() => null}
        hideArrows={true}
        selected={true}
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
          [currentDate.toISOString().split("T")[0]]: {
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
      />
      <Text style={styles.eventHeaderText}>Events:</Text>
      <FlatList
        contentContainerStyle={{ alignItems: "center" }}
        data={events
          .filter((event) => {
            const eventStartDate = new Date(event.startDate);
            const eventEndDate = new Date(event.endDate);
            const std = new Date(selectEventDate);
            return eventStartDate <= std && std <= eventEndDate;
          })
          .reverse()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedEvent(item)}>
            <View style={styles.ctn}>
              <View style={styles.leftContainer}>
                <View style={styles.leftCornerBox}></View>
                <Text style={styles.eventDay}>
                  {new Date(selectEventDate).getDate()}
                </Text>
              </View>
              <View style={styles.middleContainer}>
                <Text style={styles.eventTitle}>
                  {item.title.substring(0, 10)}
                </Text>
                <Text
                  style={styles.eventDates}
                >{`${item.startDate} - ${item.endDate}`}</Text>
                <View style={styles.rightContainer}>
                  <View style={styles.greenSquare}></View>
                  <Text
                    style={styles.eventTime}
                  >{`${item.startTime} - ${item.endTime}`}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <Modal
        visible={showJumpToDatePopup}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.centeredModalContainer}>
          <View style={styles.popup}>
            <View style={styles.jump}>
              <Text style={styles.popupTitle}>Jump to Date</Text>
            </View>
            {isshow && (
              <DateTimePicker
                value={new Date()} // Pass your initial date value here
                mode="date"
                display="spinner"
                onChange={handleJumpToDate}
              />
            )}
            <View style={styles.jumpt}>
              <TouchableOpacity
                onPress={() => setShowJumpToDatePopup(false)}
                style={styles.closeButtonContainer}
              >
                <Text style={styles.appButtonTextClose}>Close</Text>
              </TouchableOpacity>
              {/* </View> */}
              <TouchableOpacity
                onPress={jumpToDate}
                style={styles.jumpButtonContainer}
              >
                <Text style={styles.appButtonTextJump}>Jump</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditDeleteModalVisible}
        onRequestClose={toggleEditDeleteModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Event</Text>
            <TextInput
              style={styles.input}
              placeholder="Event Title"
              value={editEventTitle}
              onChangeText={(text) => setEditEventTitle(text)}
            />
            {/* Edit Start Date */}
            <Text style={styles.datePickerLabel}>Edit Start Date:</Text>
            <TouchableOpacity
              onPress={() => openEditDate("start")}
              style={styles.input}
            >
              <Text>{editEventStartDate.toISOString().split("T")[0]}</Text>
            </TouchableOpacity>

            {/* Edit End Date */}
            <Text style={styles.datePickerLabel}>Edit End Date:</Text>
            <TouchableOpacity
              onPress={() => openEditDate("end")}
              style={styles.input}
            >
              <Text>{editEventEndDate.toISOString().split("T")[0]}</Text>
            </TouchableOpacity>

            {/* Edit Start Time */}
            <Text style={styles.datePickerLabel}>Edit Start Time:</Text>
            <TouchableOpacity
              onPress={() => openEditTime("start")}
              style={styles.input}
            >
              <Text>{editEventStartTime}</Text>
            </TouchableOpacity>

            {/* Edit End Time */}
            <Text style={styles.datePickerLabel}>Edit End Time:</Text>
            <TouchableOpacity
              onPress={() => openEditTime("end")}
              style={styles.input}
            >
              <Text>{editEventEndTime}</Text>
            </TouchableOpacity>

            {showEditStartDatePicker && (
              <DateTimePicker
                value={editEventStartDate}
                mode="date"
                display="default"
                onChange={handleEditStartDateChange}
              />
            )}

            {showEditEndDatePicker && (
              <DateTimePicker
                value={editEventEndDate}
                mode="date"
                display="default"
                onChange={handleEditEndDateChange}
              />
            )}

            {showEditStartTimePicker && (
              <DateTimePicker
                value={editEventStartDate}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={handleEditStartTimeChange}
              />
            )}

            {showEditEndTimePicker && (
              <DateTimePicker
                value={editEventEndDate}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={handleEditEndTimeChange}
              />
            )}

            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={handleEditEventSubmit}>
                <Image
                  source={require("../assets/icon/edit.png")}
                  style={styles.buttonImageEdit}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleEditDeleteModal}>
                <Image
                  source={require("../assets/icon/close.png")}
                  style={styles.buttonImageClose}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={selectedEvent !== null}
        onRequestClose={() => setSelectedEvent(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Event Details</Text>
            {selectedEvent && (
              <>
                <Text style={styles.eventDetailsTitle}>
                  {selectedEvent.title}
                </Text>
                <Text style={styles.eventDetailsDates}>
                  {`${selectedEvent.startDate} - ${selectedEvent.endDate}`}
                </Text>
                <Text style={styles.eventDetailsTime}>
                  {`${selectedEvent.startTime} - ${selectedEvent.endTime}`}
                </Text>
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    onPress={() =>
                      openEditDeleteModal(
                        selectedEvent.id,
                        selectedEvent.title,
                        selectedEvent.description
                      )
                    }
                  >
                    <Image
                      source={require("../assets/icon/edit.png")} // Replace with your image source
                      style={styles.buttonImageEdit}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDeleteEvent(selectedEvent.id)}
                  >
                    <Image
                      source={require("../assets/icon/trash.png")} // Replace with your image source
                      style={styles.buttonImageTrash}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setSelectedEvent(null)}>
                    <Image
                      source={require("../assets/icon/close.png")} // Replace with your image source
                      style={styles.buttonImageClose}
                    />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isEventModalVisible}
        onRequestClose={toggleEventModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Event</Text>
            <TextInput
              style={styles.input}
              placeholder="Event Name"
              value={eventTitle}
              onChangeText={(text) => setEventTitle(text)}
            />
            <Text style={styles.datePickerLabel}>Start Date:</Text>
            <TouchableOpacity
              onPress={() => setShowStartDatePicker(true)}
              style={styles.input}
            >
              <Text>{eventStartDate.toISOString().split("T")[0]}</Text>
            </TouchableOpacity>

            <Text style={styles.datePickerLabel}>End Date:</Text>
            <TouchableOpacity
              onPress={() => setShowEndDatePicker(true)}
              style={styles.input}
            >
              <Text>{eventEndDate.toISOString().split("T")[0]}</Text>
            </TouchableOpacity>

            <Text style={styles.datePickerLabel}>Start Time:</Text>
            <TouchableOpacity
              onPress={() => setShowStartTimePicker(true)}
              style={styles.input}
            >
              <Text>{eventStartTime}</Text>
            </TouchableOpacity>
            <Text style={styles.datePickerLabel}>End Time:</Text>
            <TouchableOpacity
              onPress={() => setShowEndTimePicker(true)}
              style={styles.input}
            >
              <Text>{eventEndTime}</Text>
            </TouchableOpacity>

            {showStartDatePicker && (
              <DateTimePicker
                value={eventStartDate}
                mode="date"
                display="default"
                onChange={handleStartDateChange}
              />
            )}

            {showEndDatePicker && (
              <DateTimePicker
                value={eventEndDate}
                mode="date"
                display="default"
                onChange={handleEndDateChange}
              />
            )}

            {showStartTimePicker && (
              <DateTimePicker
                value={eventStartDate}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={(event, selecteddate) => {
                  setShowStartTimePicker(false);
                  if (selecteddate) {
                    const formattedTime = selecteddate.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                    setEventStartTime(formattedTime);
                  }
                }}
              />
            )}

            {showEndTimePicker && (
              <DateTimePicker
                value={eventEndDate}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  setShowEndTimePicker(false);
                  if (selectedDate) {
                    const formattedTime = selectedDate.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                    setEventEndTime(formattedTime);
                  }
                }}
              />
            )}

            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={handleEventSubmit}>
                <Image
                  source={require("../assets/icon/add.png")} // Replace with your image source
                  style={styles.buttonImageAdd}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleEventModal}>
                <Image
                  source={require("../assets/icon/close.png")} // Replace with your image source
                  style={styles.buttonImageClose}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={handleCurrentDate}
        style={styles.currentDateButton}
      >
        <Text style={styles.currentDateText}>{currentDayOfMonth}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleEventModal} style={styles.addButton}>
        <Image
          source={require("../assets/icon/addEvent.png")}
          style={styles.addEventImage}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MonthPage;
