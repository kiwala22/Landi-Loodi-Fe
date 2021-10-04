import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, useWindowDimensions } from "react-native";
import { IconButton } from "react-native-paper";
import { TabBar, TabView } from "react-native-tab-view";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Utils from "../utils";
import renderScene from "./renderScene";

export default function Dashboard(props) {
  const ApiManager = useSelector((state) => state.ApiManager);
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: "payments", title: "Payments", icon: "credit-card" },
    { key: "contracts", title: "Contracts", icon: "file" },
    { key: "tenants", title: "Tenants", icon: "users" },
    { key: "rentals", title: "Rentals", icon: "home" },
  ]);

  const Logout = () => {
    ApiManager.logout().then(() => props.navigation.navigate("ViewLogin"));
  };

  return (
    <>
      <Header titleText={Utils.strings.appName} />
      <IconButton
        icon="logout"
        size={25}
        color="white"
        onPress={Logout}
        style={styles.iconButton}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={(e) => renderScene(props, e)}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        tabBarPosition="bottom"
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={styles.tabBar}
            renderIcon={({ route, focused, color }) => {
              let { icon } = routes.find((r) => r.key === route.key) || {};

              return (
                <FontAwesome5
                  name={icon}
                  style={{ color, fontSize: 16, margin: 0 }}
                />
              );
            }}
            renderLabel={({ route, focused, color }) => (
              <Text style={{ color, margin: 0, fontSize: 14 }}>
                {route.title}
              </Text>
            )}
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Utils.styles.primaryColor,
  },
  iconButton: {
    position: "absolute",
    right: 0,
    top: 20,
    margin: 10,
  },
});
