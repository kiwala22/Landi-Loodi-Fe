import { Card, WhiteSpace, WingBlank } from "@ant-design/react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FAB } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { ADD_PAYMENTS } from "../redux/types";
import utils from "../utils";

export default function Payments({ navigation }) {
  const payments = useSelector((state) => state.payments);
  const ApiManager = useSelector((state) => state.ApiManager);
  const [refreshing, setRefreshing] = useState(false);
  const dispatcher = useDispatch();

  useEffect(() => getPaymentsData(), []);

  const getPaymentsData = () => {
    let path = "/payments";
    let variables = {};
    ApiManager.get(path, variables)
      .then((response) => {
        dispatcher({ type: ADD_PAYMENTS, payload: response.data });
        setRefreshing(false);
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Failed to Load Payments.",
        });
      });
  };

  const refresh = () => {
    setRefreshing(true);
    getPaymentsData();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      >
        {payments.length === 0 ? (
          <>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>You don't have any payments!</Text>
            </View>
          </>
        ) : (
          <>
            <FlatList
              data={payments}
              renderItem={({ item }) => (
                <>
                  <WingBlank size="lg">
                    <Card>
                      <Card.Header
                        title={item.payment_reference}
                        thumb={
                          <FontAwesome5
                            style={{ marginRight: 10 }}
                            name="receipt"
                          />
                        }
                      />
                      <Card.Body>
                        <View style={{ height: 120 }}>
                          <Text style={{ marginLeft: 16, marginBottom: 8 }}>
                            {item.payment_for}
                          </Text>
                          <Text style={{ marginLeft: 16, marginBottom: 8 }}>
                            {moment(item.date).format("DD-MM-YYYY")}
                          </Text>
                          <Text style={{ marginLeft: 16, marginBottom: 8 }}>
                            {item.remarks}
                          </Text>
                          <Text style={{ marginLeft: 16, marginBottom: 8 }}>
                            {`UGX ${item.amount}`}
                          </Text>
                          <Text style={{ marginLeft: 16, marginBottom: 0 }}>
                            {item.payment_by}
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
