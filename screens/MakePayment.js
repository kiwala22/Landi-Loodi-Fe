import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { FAB, IconButton, TextInput } from "react-native-paper";
import Header from "../components/Header";
import utils from "../utils";

function MakePayment({ navigation }) {
  const [amount, setAmount] = useState(0);
  const [remarks, setRemarks] = useState(null);

  const submit = () => {
    navigation.goBack();
  };

  return (
    <>
      <Header titleText={utils.strings.makePayment} />
      <IconButton
        icon="close"
        size={25}
        color="white"
        onPress={() => navigation.goBack()}
        style={styles.iconButton}
      />
      <View style={styles.container}>
        <TextInput
          label={utils.strings.amount}
          value={amount}
          mode="outlined"
          keyboardType="number-pad"
          placeholderTextColor={utils.styles.placeholderTextColor}
          onChangeText={setAmount}
          style={styles.input}
          theme={{ colors: { primary: utils.styles.primaryColor } }}
        />
        <TextInput
          label={utils.strings.remarks}
          value={remarks}
          onChangeText={setRemarks}
          mode="outlined"
          style={styles.text}
          scrollEnabled={true}
          returnKeyType="done"
          blurOnSubmit={true}
          theme={{ colors: { primary: utils.styles.primaryColor } }}
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

export default MakePayment;
