import {
  Button,
  Card,
  Modal,
  Provider,
  WhiteSpace,
  WingBlank,
} from "@ant-design/react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Print from "expo-print";
import moment from "moment";
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
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { ADD_PAYMENTS } from "../redux/types";
import utils from "../utils";

export default function Payments({ navigation }) {
  const payments = useSelector((state) => state.payments);
  const ApiManager = useSelector((state) => state.ApiManager);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  const dispatcher = useDispatch();

  useEffect(() => getPaymentsData(), []);

  async function generatePdf(content) {
    var htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>RECEIPT</title>
        <style>
            body {
                font-size: 16px;
                color: rgb(255, 196, 0);
            }
  
            h1 {
                text-align: center;
            }
  
            p {
                text-align: center;
            }
        </style>
    </head>
    <body>
        <h1>Landi Loodi Receipt ${content.payment_reference}</h1>
  
        <p>This is a printer test functionality</p>
    </body>
    </html>
    `;
    const pdf = await Print.printAsync({ html: htmlContent });

    return pdf;
  }

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
  const onClose = () => {
    setData(null);
    setVisible(false);
  };

  const displayInfo = (data) => {
    setData(data);
    setVisible(true);
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
                    <Card full>
                      <Card.Header
                        title={item.payment_reference}
                        thumb={
                          <FontAwesome5
                            style={{ marginRight: 5 }}
                            name="receipt"
                          />
                        }
                        extra={
                          <>
                            <TouchableOpacity onPress={() => displayInfo(item)}>
                              <FontAwesome5
                                name={"ellipsis-h"}
                                style={{
                                  color: "#b0006d",
                                  marginLeft: 125,
                                  fontSize: 18,
                                }}
                              />
                            </TouchableOpacity>
                          </>
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
      <Provider>
        <Modal
          title="Receipt"
          transparent
          onClose={onClose}
          maskClosable
          visible={visible}
          closable
        >
          <Button
            type="ghost"
            onPress={() => {
              generatePdf(data);
              onClose();
            }}
            style={{
              borderColor: utils.styles.primaryColor,
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            Generate PDF
          </Button>
        </Modal>
      </Provider>
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
