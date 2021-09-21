import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { FAB } from "react-native-paper";
import { Row, Table } from "react-native-table-component";
import { useDispatch, useSelector } from "react-redux";
import { ADD_RENTALS } from "../redux/types";
import utils from "../utils";

export default function Rentals({ navigation }) {
  const rentals = useSelector((state) => state.rentals);
  const ApiManager = useSelector((state) => state.ApiManager);
  const dispatcher = useDispatch();
  const TableHead = ["Rental Num #", "Amount", "Status"];
  const widthArr = [120, 125, 120];

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

  const notAllowed = ["id", "created_at", "updated_at"];
  var Data = rentals
    .map((fl) =>
      Object.keys(fl)
        .filter((vl) => !notAllowed.includes(vl))
        .reduce((obj, key) => {
          obj[key] = fl[key];
          return obj;
        }, {})
    )
    .map((element) => Object.values(element));

  return (
    <>
      {rentals.length === 0 ? (
        <>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>No Rentals registered yet!</Text>
          </View>
        </>
      ) : (
        <View>
          <ScrollView horizontal={true}>
            <View>
              <Table
                style={styles.tableTop}
                borderStyle={{ borderWidth: 1, borderColor: "#ffa1d2" }}
              >
                <Row
                  data={TableHead}
                  style={styles.HeadStyle}
                  textStyle={styles.TableText}
                  widthArr={widthArr}
                />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{ borderColor: "#C1C0B9" }}>
                  {Data.map((dataRow, index) => (
                    <Row
                      key={index}
                      data={dataRow}
                      widthArr={widthArr}
                      style={[
                        styles.row,
                        index % 2 && { backgroundColor: "#ffffff" },
                      ]}
                      textStyle={styles.text}
                    />
                  ))}
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      )}
      <FAB
        style={styles.fab}
        small
        icon="home"
        label="New Rental"
        onPress={() => navigation.navigate("ViewCreateRental")}
      />
    </>
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
