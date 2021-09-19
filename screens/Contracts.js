import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Contracts() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>No Contracts signed yet!</Text>
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
});
