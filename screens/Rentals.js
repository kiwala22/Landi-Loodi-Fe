import React, { useEffect } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors, FAB, List } from "react-native-paper";
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
      .catch((e) => alert("Failed to Load Rentals Data."));
  };

  return (
    <>
      <View style={styles.container}>
        {rentals.length === 0 ? (
          <>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>No Rentals registered yet!</Text>
            </View>
          </>
        ) : (
          <ScrollView>
            <FlatList
              data={rentals}
              renderItem={({ item }) => (
                <List.Item
                  title={`${item.rental_number} - ${item.status}`}
                  description={item.rent_amount}
                  descriptionNumberOfLines={1}
                  titleStyle={styles.listTitle}
                  left={() => <List.Icon color={Colors.pink300} icon="home" />}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </ScrollView>
        )}
        <FAB
          style={styles.fab}
          small
          icon="plus"
          label="ADD"
          onPress={() => navigation.navigate("ViewCreateRental")}
        />
      </View>
    </>
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
  tableTop: {
    padding: 5,
  },
  HeadStyle: {
    height: 50,
    alignContent: "center",
    backgroundColor: "#ffe0f0",
  },
  TableText: {
    margin: 10,
  },
  head: {
    height: 50,
    // backgroundColor: "#6F7BD9",
  },
  text: {
    textAlign: "center",
    fontWeight: "200",
    margin: 10,
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 40,
    backgroundColor: "#F7F8FA",
  },
});
