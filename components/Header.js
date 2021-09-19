import React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Title } from "react-native-paper";
import Utils from "../utils";

function Header({ titleText = Utils.strings.appName }) {
  return (
    <Appbar.Header style={styles.headerContainer}>
      <View style={styles.container}>
        <Title style={styles.title}>{titleText}</Title>
      </View>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Utils.styles.primaryColor,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#FFF",
  },
});

export default Header;
