import {
  DatePicker,
  List,
  Picker,
  Provider,
  WhiteSpace,
} from "@ant-design/react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { FAB, IconButton } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { ADD_CONTRACTS, ADD_RENTALS, ADD_TENANTS } from "../redux/types";
import utils from "../utils";

function Contract({ navigation }) {
  const [start_date, setStartDate] = useState(null);
  const [end_date, setEndDate] = useState(null);
  const [tenant_id, setTenantId] = useState(null);
  const [rental_id, setRentalId] = useState(null);
  const ApiManager = useSelector((state) => state.ApiManager);
  const rentals = useSelector((state) => state.rentals);
  const tenants = useSelector((state) => state.tenants);
  const dispatcher = useDispatch();

  useEffect(() => {
    if (!rentals.length && !tenants.length) {
      Promise.all([ApiManager.get("/tenants"), ApiManager.get("rentals")])
        .then((response1, response2) => {
          dispatcher({ type: ADD_TENANTS, payload: response1.data });

          setTimeout(
            () => dispatcher({ type: ADD_RENTALS, payload: response2.data }),
            500
          );
        })
        .catch((e) => {});
    }
  }, []);

  const submit = () => {
    let path = "/contracts";
    let variables = {
      contract: {
        start_date,
        end_date,
        tenant_id: tenant_id[0],
        rental_id: rental_id[0],
      },
    };
    ApiManager.post(path, variables)
      .then((response) => {
        dispatcher({ type: ADD_CONTRACTS, payload: response.data });
        navigation.goBack();
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: error.message,
        });
      });
  };

  return (
    <>
      <Header titleText={utils.strings.createContract} />
      <IconButton
        icon="close"
        size={25}
        color="white"
        onPress={() => navigation.goBack()}
        style={styles.iconButton}
      />
      <View style={styles.container}>
        <Provider>
          <List>
            <DatePicker
              value={start_date}
              mode="date"
              defaultDate={new Date()}
              minDate={new Date()}
              maxDate={
                new Date(`${Number(new Date().getFullYear()) + 10}`, 1, 1)
              }
              onChange={setStartDate}
              format="YYYY-MM-DD"
              extra={"Start Date"}
              locale={{
                okText: "OK",
                dismissText: "Close",
                DatePickerLocale: { year: "", month: "", day: "" },
              }}
            >
              <List.Item>Select Start Date</List.Item>
            </DatePicker>
          </List>
          <WhiteSpace size="lg" />
          <List>
            <DatePicker
              value={end_date}
              mode="date"
              defaultDate={new Date()}
              minDate={new Date()}
              maxDate={
                new Date(`${Number(new Date().getFullYear()) + 10}`, 1, 1)
              }
              onChange={setEndDate}
              format="YYYY-MM-DD"
              extra={"End Date"}
              locale={{
                okText: "OK",
                dismissText: "Close",
                DatePickerLocale: { year: "", month: "", day: "" },
              }}
            >
              <List.Item>Select End Date</List.Item>
            </DatePicker>
          </List>
          <WhiteSpace size="lg" />
          <List>
            <Picker
              data={tenants.map((tenant) => {
                return {
                  label: `${tenant.other_names} ${tenant.surname}`,
                  value: tenant.id,
                };
              })}
              cols={1}
              value={tenant_id}
              extra={"Tenant"}
              onChange={setTenantId}
              okText="OK"
              dismissText="Close"
            >
              <List.Item>Select Tenant</List.Item>
            </Picker>
          </List>
          <WhiteSpace size="lg" />
          <List>
            <Picker
              data={rentals.map((rental) => {
                return {
                  label: rental.rental_number,
                  value: rental.id,
                };
              })}
              cols={1}
              value={rental_id}
              extra={"Rental"}
              onChange={setRentalId}
              okText="OK"
              dismissText="Close"
            >
              <List.Item>Select Rental</List.Item>
            </Picker>
          </List>
        </Provider>
        <FAB style={styles.fab} icon="check" onPress={() => submit()} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  iconButton: {
    backgroundColor: "transparent",
    position: "absolute",
    right: 0,
    top: 20,
    margin: 10,
  },
  input: {
    fontSize: 16,
    marginBottom: 20,
  },
  text: {
    height: 80,
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    margin: 20,
    color: "#fff",
    backgroundColor: utils.styles.primaryColor,
    right: 0,
    bottom: 0,
  },
});

export default Contract;
