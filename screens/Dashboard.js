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
    { key: "contracts", title: "Contracts", icon: "id-card-alt" },
    { key: "tenants", title: "Tenants", icon: "address-book" },
    { key: "rentals", title: "Rentals", icon: "home" },
  ]);

  const Logout = () => {
    ApiManager.logout().then(() => props.navigation.navigate("ViewLogin"));
  };

  return (
    <>
      <Header titleText={Utils.strings.appName} />
      <IconButton
        icon="close"
        size={25}
        color="red"
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
              <Text style={{ color, margin: 0, fontSize: 15 }}>
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
    backgroundColor: "rgba(46, 113, 102, 0.8)",
    position: "absolute",
    right: 0,
    top: 40,
    margin: 10,
  },
});
