import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import CatchAuth from "../components/catchAuth";
import ViewCreateRental from "../screens/CreateRental";
import ViewDashboard from "../screens/Dashboard";
import ViewLogin from "../screens/Login";
import ViewMakePayment from "../screens/MakePayment";

const StackNavigator = createStackNavigator(
  {
    CatchAuth: {
      screen: CatchAuth,
    },
    ViewLogin: {
      screen: ViewLogin,
    },
    ViewDashboard: {
      screen: ViewDashboard,
    },
    ViewMakePayment: {
      screen: ViewMakePayment,
    },
    ViewCreateRental: {
      screen: ViewCreateRental,
    },
  },
  {
    initialRouteName: "CatchAuth",
    headerMode: "none",
    mode: "modal",
  }
);

export default createAppContainer(StackNavigator);
