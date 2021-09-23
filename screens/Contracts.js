import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FAB } from "react-native-paper";
import utils from "../utils";

export default function Contracts({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>No Contracts signed yet!</Text>

      <FAB
        style={styles.fab}
        small
        icon="plus"
        label="NEW"
        onPress={() => navigation.navigate("ViewContract")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
  },
  fab: {
    position: "absolute",
    backgroundColor: utils.styles.primaryColor,
    margin: 20,
    right: 0,
    bottom: 10,
  },
});
