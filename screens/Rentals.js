import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { FAB, List } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { ADD_RENTALS } from "../redux/types";
import utils from "../utils";

export default function Rentals({ navigation }) {
  const rentals = useSelector((state) => state.rentals);
  const ApiManager = useSelector((state) => state.ApiManager);
  const dispatcher = useDispatch();

  useEffect(() => getRentalsData(), []);

  const getRentalsData = () => {
    let path = "/rentals";
    let variables = {};
    ApiManager.get(path, variables)
      .then((response) => {
        dispatcher({ type: ADD_RENTALS, payload: response.data });
      })
      .catch((e) => alert("Failed to Load Data."));
  };

  return (
    // <View style={styles.container}>
    <>
      {rentals.length === 0 ? (
        <>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>No Rentals registered yet!</Text>
          </View>
        </>
      ) : (
        <FlatList
          data={rentals}
          renderItem={({ item }) => (
            <List.Item
              title={item.rental_number}
              description={item.status}
              left={(props) => <List.Icon {...props} icon="home" />}
              titleStyle={styles.listTitle}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <FAB
        style={styles.fab}
        small
        icon="home"
        label="New Rental"
        onPress={() => navigation.navigate("ViewCreateRental")}
      />
    </>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
