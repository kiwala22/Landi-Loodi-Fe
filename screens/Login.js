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
import { useDispatch, useSelector } from "react-redux";
// import { AddTenants } from "../redux/creators";
import Utils from "../utils";

export default function LoginScreen({ navigation }) {
  const ApiManager = useSelector((state) => state.ApiManager);
  const dispatch = useDispatch();
  const [secure, setSecure] = useState(true);
  // dispatch(AddTenants([]));

  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);

  const Login = () => {
    ApiManager.login(phone, password)
      .then(() => {
        navigation.navigate("ViewDashboard");
      })
      .catch((e) => alert("Authentication Failed!"));
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
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />

          <FontAwesome5 name="lock" style={styles.iconLock} />

          <TextInput
            style={styles.inputPassword}
            secureTextEntry={secure}
            placeholder={Utils.strings.password}
            onChangeText={(text) => setPassword(text)}
          />

          <FontAwesome5
            style={styles.iconEye}
            name={secure ? "eye-slash" : "eye"}
            onPress={() => setSecure(!secure)}
          />

          <TouchableOpacity style={styles.buttonLogin} onPress={Login}>
            <Text style={styles.buttonLoginText}>{Utils.strings.submit}</Text>
          </TouchableOpacity>
        </View>

        <View>
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
  iconEye: {
    color: "#929292",
    position: "absolute",
    fontSize: 18,
    top: 98,
    left: 275,
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
    flex: 1,
  },
});
