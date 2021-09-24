import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppNavigator from "./navigation";
import { persistor, store } from "./redux/store";

export default function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <AppNavigator />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
}
