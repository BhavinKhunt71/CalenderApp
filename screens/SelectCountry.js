import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import CustomSelect from "../components/Ui/CustomSelect";
import { useNavigationContext } from "../NavigationContext";

const SelectCountry = () => {
  const [countries, setCountries] = React.useState([]);
  const [loading, setLoading] = React.useState(true); // Loading state
  const [error, setError] = React.useState(null); // Error state
  const { setSelectedCountry } = useNavigationContext();

  useEffect(() => {
    async function fetchCountries() {
      const url =
        "https://calendarific.com/api/v2/countries?&api_key=hqheYRNAGyZNBD6unm750hOuha8VuoOT&country=us&year=2024&&type=national";

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.response.countries; // Adjust this based on the actual structure of the returned data
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError("Failed to load countries. Please try again later.");
        return null;
      }
    }

    fetchCountries().then((countries) => {
      if (countries) {
        const countriesData = countries.map((country) => ({
          label: country.country_name,
          value: country["iso-3166"],
        }));
        setCountries(countriesData);
      }
      setLoading(false); // Set loading to false when data is fetched or an error occurs
    });
  }, []);

  const handleChangeCountry = (value) => {
    setSelectedCountry(value);
  };

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
      <Text style={styles.selectCountryText}>Select Your Country</Text>
      {countries.length > 0 && (
        <CustomSelect
          item={countries}
          defaultSelect={"IN"}
          onPress={handleChangeCountry}
        />
      )}
    </View>
  );
};

export default SelectCountry;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
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
  selectCountryText: {
    fontSize: 20,
    paddingBottom: 10,
    fontWeight: "500",
  },
});
