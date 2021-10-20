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
import { ADD_TENANTS } from "../redux/types";
import utils from "../utils";

export default function Tenants({ navigation }) {
  const tenants = useSelector((state) => state.tenants);
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const ApiManager = useSelector((state) => state.ApiManager);
  const [data, setData] = useState({});
  const dispatcher = useDispatch();
  useEffect(() => fetchTenants(), []);

  const fetchTenants = () => {
    let path = "/tenants";
    let variables = {};
    ApiManager.get(path, variables)
      .then((response) => {
        dispatcher({ type: ADD_TENANTS, payload: response.data });
        setRefreshing(false);
      })
      .catch((e) => {
        alert("Failed to Load Tenants Data.");
      });
  };

  const onClose = () => {
    setData(null);
    setVisible(false);
  };

  const refresh = () => {
    setRefreshing(true);
    fetchTenants();
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
        {tenants.length === 0 ? (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{utils.strings.noTenantsFound}</Text>
          </View>
        ) : (
          <>
            <FlatList
              data={tenants}
              renderItem={({ item }) => (
                <>
                  <WingBlank size="lg">
                    <Card full>
                      <Card.Header
                        title={`${item.other_names} ${item.surname}`}
                        thumb={
                          <FontAwesome5
                            style={{ marginRight: 10 }}
                            name="user"
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
                                  fontSize: 20,
                                }}
                              />
                            </TouchableOpacity>
                          </>
                        }
                      />
                      <Card.Body>
                        <View style={{ height: 65 }}>
                          <Text style={{ marginLeft: 16, marginBottom: 8 }}>
                            {`+${item.phone_number}`}
                          </Text>
                          <Text style={{ marginLeft: 16, marginBottom: 8 }}>
                            {item.id_number}
                          </Text>
                          <Text style={{ marginLeft: 16, marginBottom: 8 }}>
                            {item.marital_status}
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
              navigation.navigate("ViewRegisterTenant", data);
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
        label="Add"
        onPress={() => navigation.navigate("ViewRegisterTenant", {})}
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
  listTitle: {
    fontSize: 20,
  },
});
