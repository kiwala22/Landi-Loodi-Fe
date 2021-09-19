import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { FAB, List } from "react-native-paper";
import { useSelector } from "react-redux";
import utils from "../utils";

export default function Payments({ navigation }) {
  const payments = useSelector((state) => state.payments);

  return (
    <View style={styles.container}>
      {payments.length === 0 ? (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>You don't have any payments!</Text>
        </View>
      ) : (
        <FlatList
          data={payments}
          renderItem={({ item }) => (
            <List.Item
              title={"test"}
              description={"remarks"}
              descriptionNumberOfLines={1}
              titleStyle={styles.listTitle}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <FAB
        style={styles.fab}
        small
        icon="credit-card"
        label="Pay"
        onPress={() => navigation.navigate("ViewMakePayment")}
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
