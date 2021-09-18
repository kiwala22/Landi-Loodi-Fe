import { FontAwesome5 } from "@expo/vector-icons";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ApiManager from "../api/ApiManager";
import Utils from "../utils";

export default function LoginScreen() {
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  let api = new ApiManager();

  const Login = () => {
    api
      .login(phone, password)
      .then(() => alert(api.authToken))
      .catch((e) => alert("error"));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* https://docs.expo.io/versions/latest/sdk/status-bar */}
      <StatusBar style="light" />

      <View style={styles.content}>
        <View style={styles.textWrapper}>
          <Text style={styles.hiText}>{Utils.strings.appName}</Text>
          <Text style={styles.userText}>{Utils.strings.login}</Text>
        </View>

        <View style={styles.form}>
          {/* https://docs.expo.io/guides/icons */}
          <FontAwesome5 name="phone" style={styles.iconPhone} />

          {/* https://reactnative.dev/docs/textinput */}
          {/* https://reactnative.dev/docs/textinput#onchange */}
          <TextInput
            style={styles.inputPhone}
            keyboardType="phone-pad"
            placeholder={Utils.strings.phone}
            placeholderTextColor={Utils.styles.placeholderTextColor}
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />

          <FontAwesome5 name="lock" style={styles.iconLock} />

          <TextInput
            style={styles.inputPassword}
            secureTextEntry={true}
            placeholder={Utils.strings.password}
            placeholderTextColor={Utils.styles.placeholderTextColor}
            onChangeText={(text) => setPassword(text)}
          />

          {/* https://reactnative.dev/docs/touchableopacity */}
          <TouchableOpacity style={styles.buttonLogin} onPress={Login}>
            <Text style={styles.buttonLoginText}>{Utils.strings.submit}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={styles.userText}>
              &copy; {new Date().getFullYear()} {Utils.strings.copyright}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const TEXT = {
  color: "#fff",
  textAlign: "center",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Utils.styles.primaryColor,
    paddingTop: Constants.statusBarHeight,
  },
  content: {
    paddingHorizontal: 30,
  },
  textWrapper: {
    marginTop: 60,
    marginBottom: 30,
  },
  hiText: {
    ...TEXT,
    fontSize: 20,
    lineHeight: 50,
    fontWeight: "bold",
  },
  userText: {
    ...TEXT,
    fontSize: 16,
    lineHeight: 30,
  },
  form: {
    marginBottom: 30,
  },
  iconLock: {
    color: "#929292",
    position: "absolute",
    fontSize: 16,
    top: 95,
    left: 22,
    zIndex: 10,
  },
  iconPhone: {
    color: "#929292",
    position: "absolute",
    fontSize: 16,
    top: 22,
    left: 22,
    zIndex: 10,
  },
  inputPhone: {
    height: 60,
    borderRadius: 30,
    paddingHorizontal: 30,
    fontSize: 20,
    color: "#929292",
    backgroundColor: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
    marginBottom: 15,
  },
  inputPassword: {
    height: 60,
    borderRadius: 30,
    paddingHorizontal: 30,
    fontSize: 20,
    color: "#929292",
    backgroundColor: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
  },
  buttonLogin: {
    height: 50,
    borderRadius: 25,
    backgroundColor: "#8d015a",
    justifyContent: "center",
    marginTop: 15,
  },
  buttonLoginText: {
    ...TEXT,
  },
  footer: {
    flex: 0.1,
  },
});
