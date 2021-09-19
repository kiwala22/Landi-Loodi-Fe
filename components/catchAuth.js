import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

export default function CatchAuth({ navigation }) {
  const ApiManager = useSelector((state) => state.ApiManager);
  /**
   * if auth token present the go straight to home
   */
  if (ApiManager.isLoggedIn()) {
    navigation.navigate("ViewDashboard");
  } else {
    navigation.navigate("ViewLogin");
  }

  return <View></View>;
}
