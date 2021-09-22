import {
  Card,
  Modal,
  Provider,
  WhiteSpace,
  WingBlank,
} from "@ant-design/react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { FAB } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { ADD_RENTALS } from "../redux/types";
import utils from "../utils";

export default function Rentals({ navigation }) {
  const rentals = useSelector((state) => state.rentals);
  const ApiManager = useSelector((state) => state.ApiManager);
  const [visible, setVisible] = useState(false);
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

  const onClose = () => {
    setVisible(false);
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
          <>
            <FlatList
              data={rentals}
              renderItem={({ item }) => (
                <>
                  <WingBlank size="lg">
                    <Card>
                      <Card.Header
                        title={item.rental_number}
                        // thumb={<Icon style={{ marginRight: 2 }} name={"user"} />}
                        extra={
                          <>
                            <TouchableOpacity onPress={() => setVisible(true)}>
                              <FontAwesome5
                                name={"ellipsis-h"}
                                style={{
                                  color: "#b0006d",
                                  marginLeft: 125,
                                  fontSize: 20,
                                }}
                              />
                            </TouchableOpacity>
                          </>
                        }
                      />
                      <Card.Body>
                        <View style={{ height: 40 }}>
                          <Text style={{ marginLeft: 16, marginBottom: 8 }}>
                            {item.rent_amount}
                          </Text>
                          <Text style={{ marginLeft: 16, marginBottom: 0 }}>
                            {item.status}
                          </Text>
                        </View>
                      </Card.Body>
                    </Card>
                  </WingBlank>
                  <WhiteSpace size="lg" />
                </>
              )}
              keyExtractor={(item) => item.id}
            />
            <Provider>
              <Modal
                title="Edit Actions"
                transparent
                onClose={onClose}
                maskClosable
                visible={visible}
                closable
              >
                <View style={{ paddingVertical: 20 }}>
                  <Text style={{ textAlign: "center" }}>Edit</Text>
                  <Text style={{ textAlign: "center" }}>Delete</Text>
                </View>
              </Modal>
            </Provider>
          </>
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
