import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CatchAuth from "../components/catchAuth";
import ViewContract from "../screens/Contract";
import ViewCreateRental from "../screens/CreateRental";
import ViewDashboard from "../screens/Dashboard";
import ViewLogin from "../screens/Login";
import ViewMakePayment from "../screens/MakePayment";
import ViewRegisterTenant from "../screens/RegisterTenant";

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CatchAuth"
        screenOptions={{
          headerShown: false,
          // presentation: "modal"
        }}
      >
        <Stack.Screen name="CatchAuth" component={CatchAuth} />
        <Stack.Screen name="ViewLogin" component={ViewLogin} />
        <Stack.Screen name="ViewDashboard" component={ViewDashboard} />
        <Stack.Screen name="ViewMakePayment" component={ViewMakePayment} />
        <Stack.Screen name="ViewCreateRental" component={ViewCreateRental} />
        <Stack.Screen
          name="ViewRegisterTenant"
          component={ViewRegisterTenant}
        />
        <Stack.Screen name="ViewContract" component={ViewContract} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
