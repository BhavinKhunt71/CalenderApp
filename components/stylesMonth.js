import { Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const containerWidthPercentage = 90;

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    datePickerLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
    },
    cent: {
      alignItems: 'center',
    },
    ctn: {
      width: (windowWidth * containerWidthPercentage) / 100,
      height: 80,
      borderRadius: 10,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#07967A',
      shadowColor: 'rgba(0, 0, 0, 0.25)',
      backgroundColor: 'white',
      marginTop: 20,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 2, // for Android shadow
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
    },
    arrow: {
      width: 20,
      height: 20,
    },
    leftContainer: {
      flexDirection: 'row'
    },
    eventDetailsTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    eventDetailsDates: {
      fontSize: 16,
      color: '#777',
    },
    eventDetailsTime: {
      fontSize: 16,
      color: '#777',
    },
    editButton: {
      backgroundColor: '#07967A',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
    },
    centeredModalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    popup: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: 230,
      height: 49
    },
    jumpt: {
      flexDirection: 'row'
    },
    jump: {
      marginBottom: 10,
      width: 230,
      height: 49,
      justifyContent: 'center', // Center text vertically
      alignItems: 'center',
      backgroundColor: '#07967A',
      borderRadius: 11
    },
    closeButtonContainer: {
      width: 100,
      height: 38,
      flexShrink: 0,
      borderRadius: 10,
      backgroundColor: 'rgba(7, 150, 122, 0.21)',
      justifyContent: 'center', // Center the button vertically
      alignItems: 'center', // Center the button horizontally
      marginTop: 10, 
      marginHorizontal:15// Adjust the margin as needed
    },
    appButtonTextClose:{
      color: 'black',
      fontWeight: 'bold',
    },
    appButtonTextJump:{
      color: 'white',
      fontWeight: 'bold',
    },
    jumpButtonContainer:{
      width: 100,
      height: 38,
      flexShrink: 0,
      borderRadius: 10,
      backgroundColor: '#07967A',
      justifyContent: 'center', // Center the button vertically
      alignItems: 'center', // Center the button horizontally
      marginTop: 10,
      
    },
    popupTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
  
    },
  
    dateInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    datePicker: {
      width: 200, // Adjust the width as needed
      marginBottom: 10,
    },
    editButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    deleteButton: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      alignItems: 'center',
    },
    deleteButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    closeButton: {
      backgroundColor: '#ccc',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      alignItems: 'center',
    },
    closeButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  
    leftCornerBox: {
      width: 20,
      height: 80,
      flexShrink: 0,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 10,
      backgroundColor: '#07967A',
    },
  
    middleContainer: {
      paddingHorizontal: 10,
      marginHorizontal: 40,
    },
    rightContainer: {
      flexDirection: 'row'
    },
    greenSquare: {
      width: 10,
      height: 10,
      backgroundColor: '#07967A',
      borderRadius: 2,
      marginTop: 10,
      marginRight: 5
    },
    eventDay: {
      fontSize: 18,
      fontWeight: 'bold',
      position: 'relative', // Add this line
      zIndex: 1,
      marginHorizontal: 20,
      marginVertical: 28
  
    },
    eventTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    eventTime: {
      fontSize: 14,
      color: '#777',
      marginTop: 5
    },
    monthText: {
      color: '#040404',
      textAlign: 'center',
      fontSize: 17,
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: 24,
      marginHorizontal: 20,
    },
    button: {
      paddingHorizontal: 10,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    buttonImageEdit: {
      width: 32,
      height: 32,
      marginLeft: 5,
      tintColor: '#07967A'
    },
    buttonImageClose: {
      width: 32,
      height: 32,
    },
    buttonImageTrash: {
      width: 32,
      height: 32,
      tintColor: 'red'
    },
    buttonImageAdd: {
      width: 32,
      height: 32,
      marginLeft: 5,
      tintColor: '#07967A'
    },
    currentDateButton: {
      position: 'absolute',
      bottom: 20,
      right: 80,
      backgroundColor: '#07967A',
      borderRadius: 30,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    currentDateText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 25,
    },
    addButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      width: 50,
      height: 50,
      backgroundColor: '#07967A',
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addEventImage: {
      width: 30,
      height: 30,
    },
    eventHeaderText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      marginLeft: 20,
    },
    eventItem: {
      backgroundColor: '#F5F5F5',
      borderRadius: 10,
      margin: 10,
      padding: 10,
    },
    eventTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    eventDescription: {
      fontSize: 14,
      color: '#777',
    },
    eventActionText: {
      color: '#07967A',
      fontWeight: 'bold',
      marginTop: 5,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      width: 300,
      padding: 20,
      borderRadius: 10,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    submitButton: {
      backgroundColor: '#07967A',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    submitButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    cancelButton: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      alignItems: 'center',
    },
    cancelButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
  