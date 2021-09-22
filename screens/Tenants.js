import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors, FAB, List } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TENANTS } from "../redux/types";
import utils from "../utils";

export default function Tenants({ navigation }) {
  const tenants = useSelector((state) => state.tenants);
  const ApiManager = useSelector((state) => state.ApiManager);
  const dispatcher = useDispatch();
  useEffect(() => fetchTenants(), []);

  const fetchTenants = () => {
    let path = "/tenants";
    let variables = {};
    ApiManager.get(path, variables)
      .then((response) => {
        dispatcher({ type: ADD_TENANTS, payload: response.data });
      })
      .catch((e) => alert("Failed to Load Tenants Data."));
  };

  return (
    <View style={styles.container}>
      {tenants.length === 0 ? (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{utils.strings.noTenantsFound}</Text>
        </View>
      ) : (
        <FlatList
          data={tenants}
          renderItem={({ item }) => (
            <List.Item
              title={`${item.other_names} ${item.surname}`}
              description={item.phone_number}
              descriptionNumberOfLines={1}
              titleStyle={styles.listTitle}
              left={() => <List.Icon color={Colors.pink300} icon="account" />}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      <FAB
        style={styles.fab}
        small
        icon="plus"
        label="Add"
        onPress={() => navigation.navigate("ViewRegisterTenant")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
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
  listTitle: {
    fontSize: 20,
  },
});
