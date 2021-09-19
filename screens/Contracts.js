import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Contracts() {
  return (
    <View style={styles.container}>
      <Text>Contracts</Text>
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
});
