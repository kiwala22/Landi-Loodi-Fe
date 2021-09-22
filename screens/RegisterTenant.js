import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { FAB, IconButton, TextInput } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { ADD_TENANTS } from "../redux/types";
import utils from "../utils";

function RegisterTenant({ navigation }) {
  const [phone_number, setPhone] = useState(null);
  const [surname, setSurName] = useState(null);
  const [other_names, setOtherNames] = useState(null);
  const [marital_status, setMaritalStatus] = useState(null);
  const [id_number, setIdNumber] = useState(null);
  const ApiManager = useSelector((state) => state.ApiManager);

  const placeholder = {
    label: utils.strings.maritalStatus,
    value: null,
    color: "#9EA0A4",
  };

  const submit = () => {
    let variables = {
      tenant: {
        phone_number,
        surname,
        other_names,
        marital_status,
        id_number,
      },
    };

    ApiManager.post("/tenants", variables)
      .then((response) => {
        dispatcher({ type: ADD_TENANTS, payload: response.data });
        navigation.goBack();
      })
      .catch((e) => alert(utils.strings.failedToRegisterTenant));
  };

  return (
    <>
      <Header titleText={utils.strings.registerTenant} />
      <IconButton
        icon="close"
        size={25}
        color="white"
        onPress={() => navigation.goBack()}
        style={styles.iconButton}
      />
      <View style={styles.container}>
        <TextInput
          placeholder={utils.strings.idNumber}
          value={id_number}
          mode="outlined"
          onChangeText={setIdNumber}
          style={styles.input}
          theme={{ colors: { primary: utils.styles.primaryColor } }}
        />
        <TextInput
          placeholder={utils.strings.phone}
          value={phone_number}
          mode="outlined"
          keyboardType="number-pad"
          onChangeText={setPhone}
          style={styles.input}
          theme={{ colors: { primary: utils.styles.primaryColor } }}
        />
        <TextInput
          placeholder={utils.strings.surname}
          value={surname}
          mode="outlined"
          onChangeText={setSurName}
          style={styles.input}
          theme={{ colors: { primary: utils.styles.primaryColor } }}
        />
        <TextInput
          placeholder={utils.strings.otherNames}
          value={other_names}
          mode="outlined"
          onChangeText={setOtherNames}
          style={styles.input}
          theme={{ colors: { primary: utils.styles.primaryColor } }}
        />
        <RNPickerSelect
          placeholder={placeholder}
          value={marital_status}
          items={[
            { label: "Single", value: "single" },
            { label: "Married", value: "married" },
            { label: "Other", value: "other" },
          ]}
          placeholderTextColor={placeholder.color}
          theme={{ colors: { primary: utils.styles.primaryColor } }}
          onValueChange={(value) => setMaritalStatus(value)}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
        />
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
    paddingVertical: 20,
  },
  iconButton: {
    backgroundColor: "transparent",
    position: "absolute",
    right: 0,
    top: 20,
    margin: 10,
  },
  input: {
    fontSize: 16,
    marginBottom: 20,
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

export default RegisterTenant;
