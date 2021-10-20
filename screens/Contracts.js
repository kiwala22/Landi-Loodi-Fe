import { Card, WhiteSpace, WingBlank } from "@ant-design/react-native";
import { FontAwesome5 } from "@expo/vector-icons";
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
import { ADD_CONTRACTS } from "../redux/types";
import utils from "../utils";

export default function Contracts({ navigation }) {
  const contracts = useSelector((state) => state.contracts);
  const ApiManager = useSelector((state) => state.ApiManager);
  const [refreshing, setRefreshing] = useState(false);
  const dispatcher = useDispatch();

  useEffect(() => getContractsData(), []);

  const getContractsData = () => {
    let path = "/contracts";
    let variables = {};
    ApiManager.get(path, variables)
      .then((response) => {
        dispatcher({ type: ADD_CONTRACTS, payload: response.data });
        setRefreshing(false);
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Failed to Load Contracts.",
        });
      });
  };

  const refresh = () => {
    setRefreshing(true);
    getContractsData();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      >
        {contracts.length === 0 ? (
          <>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>No Contracts signed yet!</Text>
            </View>
          </>
        ) : (
          <>
            <FlatList
              data={contracts}
              renderItem={({ item }) => (
                <>
                  <WingBlank size="lg">
                    <Card full>
                      <Card.Header
                        title={item.tenant_name}
                        thumb={
                          <FontAwesome5
                            style={{ marginRight: 10 }}
                            name="file"
                          />
                        }
                        extra={`+${item.phone_number}`}
                      />
                      <Card.Body>
                        <View style={{ height: 60 }}>
                          <Text style={{ marginLeft: 16, marginBottom: 8 }}>
                            {item.rental_number}
                          </Text>
                          <Text style={{ marginLeft: 16, marginBottom: 0 }}>
                            {item.duration}
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
        icon="plus"
        label="NEW"
        onPress={() => navigation.navigate("ViewContract")}
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
    paddingTop: 30,
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
});
