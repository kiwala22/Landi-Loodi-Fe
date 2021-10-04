import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { FAB, IconButton, TextInput } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { ADD_RENTALS } from "../redux/types";
import utils from "../utils";

function CreateRental({ route, navigation }) {
  const data = route.params;
  const [rentalNumber, setRentalNumber] = useState(data.rental_number);
  const [rentalAmount, setRentalAmount] = useState(data.rent_amount);
  const [status, setStatus] = useState(data.status);
  const ApiManager = useSelector((state) => state.ApiManager);
  const dispatcher = useDispatch();

  const placeholder = {
    label: "Select a status...",
    value: null,
    color: "#9EA0A4",
  };

  const submit = () => {
    let path = "/rentals";
    let variables = {
      rental: {
        rental_number: rentalNumber,
        rent_amount: rentalAmount,
        status: status,
      },
    };

    if (data.id) {
      //patch update
    } else {
      ApiManager.post(path, variables)
        .then((response) => {
          dispatcher({ type: ADD_RENTALS, payload: response.data });
          navigation.goBack();
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            text1: error.message,
          });
        });
    }
  };

  return (
    <>
      <Header titleText={utils.strings.createRental} />
      <IconButton
        icon="close"
        size={25}
        color="white"
        onPress={() => navigation.goBack()}
        style={styles.iconButton}
      />
      <View style={styles.container}>
        <ScrollView>
          <TextInput
            placeholder={utils.strings.rentalNumber}
            value={rentalNumber}
            mode="outlined"
            keyboardType="default"
            placeholderTextColor={placeholder.color}
            onChangeText={setRentalNumber}
            style={styles.input}
            theme={{ colors: { primary: utils.styles.primaryColor } }}
          />
          <TextInput
            placeholder={utils.strings.amount}
            value={rentalAmount}
            mode="outlined"
            keyboardType="numeric"
            placeholderTextColor={placeholder.color}
            onChangeText={setRentalAmount}
            style={styles.input}
            theme={{ colors: { primary: utils.styles.primaryColor } }}
          />
          <RNPickerSelect
            placeholder={placeholder}
            value={status}
            items={[
              { label: "Available", value: "Available" },
              { label: "Occupied", value: "Occupied" },
            ]}
            placeholderTextColor={placeholder.color}
            theme={{ colors: { primary: utils.styles.primaryColor } }}
            onValueChange={(value) => setStatus(value)}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
          />
        </ScrollView>
        <FAB style={styles.fab} icon="check" onPress={() => submit()} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  iconButton: {
    // backgroundColor: "transparent",
    position: "absolute",
    right: 0,
    top: 20,
    margin: 10,
  },
  input: {
    fontSize: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  text: {
    height: 80,
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    margin: 20,
    color: "#fff",
    backgroundColor: utils.styles.primaryColor,
    right: 0,
    bottom: 0,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    height: 60,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default CreateRental;
