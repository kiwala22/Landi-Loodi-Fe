import {
  Button,
  Card,
  Modal,
  Provider,
  WhiteSpace,
  WingBlank,
} from "@ant-design/react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FAB } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { ADD_RENTALS } from "../redux/types";
import utils from "../utils";

export default function Rentals({ navigation }) {
  const rentals = useSelector((state) => state.rentals);
  const ApiManager = useSelector((state) => state.ApiManager);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  const dispatcher = useDispatch();

  useEffect(() => getRentalsData(), []);

  const getRentalsData = () => {
    let path = "/rentals";
    let variables = {};
    ApiManager.get(path, variables)
      .then((response) => {
        dispatcher({ type: ADD_RENTALS, payload: response.data });
        setRefreshing(false);
      })
      .catch((e) => alert("Failed to Load Rentals Data."));
  };

  const onClose = () => {
    setData(null);
    setVisible(false);
  };

  const refresh = () => {
    setRefreshing(true);
    getRentalsData();
  };

  const displayInfo = (data) => {
    setData(data);
    setVisible(true);
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
        >
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
                          thumb={
                            <FontAwesome5
                              style={{ marginRight: 10 }}
                              name="home"
                            />
                          }
                          extra={
                            <>
                              <TouchableOpacity
                                onPress={() => displayInfo(item)}
                              >
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
            </>
          )}
        </ScrollView>
        <Provider>
          <Modal
            title="Actions"
            transparent
            onClose={onClose}
            maskClosable
            visible={visible}
            closable
          >
            <Button
              type="ghost"
              onPress={() => {
                onClose();
                navigation.navigate("ViewCreateRental", data);
              }}
              style={{
                borderColor: utils.styles.primaryColor,
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              Edit
            </Button>
          </Modal>
        </Provider>
        <FAB
          style={styles.fab}
          small
          icon="plus"
          label="ADD"
          onPress={() => navigation.navigate("ViewCreateRental", {})}
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
