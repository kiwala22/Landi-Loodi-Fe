import {
  DatePicker,
  List,
  Picker,
  Provider,
  WhiteSpace,
} from "@ant-design/react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { FAB, IconButton, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { ADD_PAYMENTS, ADD_RENTALS } from "../redux/types";
import utils from "../utils";

function MakePayment({ navigation }) {
  const [amount, setAmount] = useState(null);
  const [remarks, setRemarks] = useState(null);
  const [rental_id, setRentalId] = useState([]);
  const [date, setDate] = useState(null);
  const ApiManager = useSelector((state) => state.ApiManager);
  const rentals = useSelector((state) => state.rentals);
  const dispatcher = useDispatch();

  useEffect(() => {
    if (!rentals.length) {
      Promise.all([ApiManager.get("rentals")])
        .then((response) => {
          dispatcher({ type: ADD_RENTALS, payload: response.data });
        })
        .catch((e) => {});
    }
  }, []);

  const submit = () => {
    let path = "/payments";
    let variables = {
      payment: {
        amount,
        remarks,
        date,
        rental_id: rental_id[0],
      },
    };
    ApiManager.post(path, variables)
      .then((response) => {
        dispatcher({ type: ADD_PAYMENTS, payload: response.data });
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
      <Header titleText={utils.strings.makePayment} />
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
            <TextInput
              label={utils.strings.amount}
              value={amount}
              mode="outlined"
              keyboardType="number-pad"
              placeholderTextColor={utils.styles.placeholderTextColor}
              onChangeText={setAmount}
              style={styles.input}
              theme={{ colors: { primary: utils.styles.primaryColor } }}
            />
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
          <WhiteSpace size="lg" />
          <List>
            <DatePicker
              value={date}
              mode="date"
              defaultDate={new Date()}
              minDate={new Date()}
              maxDate={
                new Date(`${Number(new Date().getFullYear()) + 10}`, 1, 1)
              }
              onChange={setDate}
              format="YYYY-MM-DD"
              extra={"Payment Date"}
              locale={{
                okText: "OK",
                dismissText: "Close",
                DatePickerLocale: { year: "", month: "", day: "" },
              }}
            >
              <List.Item>Select Payment Date</List.Item>
            </DatePicker>
          </List>
          <WhiteSpace size="lg" />
          <List>
            <TextInput
              label={utils.strings.remarks}
              value={remarks}
              onChangeText={setRemarks}
              mode="outlined"
              style={styles.text}
              scrollEnabled={true}
              returnKeyType="done"
              blurOnSubmit={true}
              theme={{ colors: { primary: utils.styles.primaryColor } }}
            />
          </List>
          <WhiteSpace size="lg" />
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
    marginBottom: 20,
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

export default MakePayment;
