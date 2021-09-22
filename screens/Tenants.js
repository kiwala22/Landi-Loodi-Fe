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
import { ADD_TENANTS } from "../redux/types";
import utils from "../utils";

export default function Tenants({ navigation }) {
  const tenants = useSelector((state) => state.tenants);
  const [visible, setVisible] = useState(false);
  const ApiManager = useSelector((state) => state.ApiManager);
  const dispatcher = useDispatch();
  useEffect(() => fetchTenants(), []);

  const fetchTenants = () => {
    let path = "/tenants";
    let variables = {};
    ApiManager.get(path, variables)
      .then((response) => {
        dispatcher({ type: ADD_TENANTS, payload: response.data });
      })
      .catch((e) => alert("Failed to Load Tenants Data."));
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>
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
                  <Card>
                    <Card.Header
                      title={`${item.other_names} ${item.surname}`}
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
        label="Add"
        onPress={() => navigation.navigate("ViewRegisterTenant")}
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
