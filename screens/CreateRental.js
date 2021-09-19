import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { FAB, IconButton, TextInput } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import Header from "../components/Header";
import utils from "../utils";

function CreateRental({ navigation }) {
  const [rentalNumber, setRentalNumber] = useState(null);
  const [rentalAmount, setRentalAmount] = useState(0);
  const [status, setStatus] = useState(null);

  const submit = () => {
    navigation.goBack();
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
        <TextInput
          label={utils.strings.rentalNumber}
          value={rentalNumber}
          mode="outlined"
          keyboardType="default"
          placeholderTextColor={utils.styles.placeholderTextColor}
          onChangeText={setRentalNumber}
          style={styles.input}
          theme={{ colors: { primary: utils.styles.primaryColor } }}
        />
        <TextInput
          label={utils.strings.amount}
          value={rentalAmount}
          mode="outlined"
          keyboardType="number-pad"
          placeholderTextColor={utils.styles.placeholderTextColor}
          onChangeText={setRentalAmount}
          style={styles.input}
          theme={{ colors: { primary: utils.styles.primaryColor } }}
        />
        <RNPickerSelect
          onValueChange={(value) => setStatus(value)}
          value={status}
          items={[
            { label: "Available", value: "Available" },
            { label: "Occupied", value: "Occupied" },
          ]}
          mode="outlined"
          keyboardType="default"
          placeholderTextColor={utils.styles.placeholderTextColor}
          style={styles.input}
          theme={{ colors: { primary: utils.styles.primaryColor } }}
        />
        {/* <Picker
          selectedValue={status}
          onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}
          mode="outlined"
          style={styles.text}
          scrollEnabled={true}
          returnKeyType="done"
          blurOnSubmit={true}
          theme={{ colors: { primary: utils.styles.primaryColor } }}
        >
          <Picker.Item label="Available" value="Available" />
          <Picker.Item label="Occupied" value="Occupied" />
        </Picker> */}
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
    backgroundColor: "rgba(46, 113, 102, 0.8)",
    position: "absolute",
    right: 0,
    top: 20,
    margin: 10,
  },
  input: {
    fontSize: 24,
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

export default CreateRental;
