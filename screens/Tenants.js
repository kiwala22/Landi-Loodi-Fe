import { Card, Icon, WhiteSpace, WingBlank } from "@ant-design/react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { FAB } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TENANTS } from "../redux/types";
import utils from "../utils";

export default function Tenants({ navigation }) {
  const tenants = useSelector((state) => state.tenants);
  const ApiManager = useSelector((state) => state.ApiManager);
  const dispatcher = useDispatch();
  const [isReady, setIsReady] = useState(false);
  useEffect(() => fetchTenants(), []);

  /* Man first help me check this use effect function, it is crashing on every refresh */

  useEffect(async () => {
    await Font.loadAsync(
      "antoutline",
      require("@ant-design/icons-react-native/fonts/antoutline.ttf")
    );

    await Font.loadAsync(
      "antfill",
      require("@ant-design/icons-react-native/fonts/antfill.ttf")
    );
    setIsReady(true);
  }, []);

  const fetchTenants = () => {
    let path = "/tenants";
    let variables = {};
    ApiManager.get(path, variables)
      .then((response) => {
        dispatcher({ type: ADD_TENANTS, payload: response.data });
      })
      .catch((e) => alert("Failed to Load Tenants Data."));
  };

  return (
    <View style={styles.container}>
      {tenants.length === 0 ? (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{utils.strings.noTenantsFound}</Text>
        </View>
      ) : isReady ? (
        <FlatList
          data={tenants}
          renderItem={({ item }) => (
            <>
              <WingBlank size="lg">
                <Card>
                  <Card.Header
                    title={`${item.other_names} ${item.surname}`}
                    thumb={<Icon style={{ marginRight: 2 }} name={"user"} />}
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
      ) : (
        AppLoading
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
