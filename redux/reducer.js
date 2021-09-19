/**
 * for more about redux and react native
 * visit blog https://heartbeat.fritz.ai/using-redux-with-react-hooks-in-a-react-native-app-cc410a77f3e2
 */

import xtend from "xtend";
import ApiManager from "../api/ApiManager";
import { ADD_CONTRACTS, ADD_PAYMENTS, ADD_RENTALS, ADD_TENANTS } from "./types";

const initialState = {
  ApiManager: new ApiManager(),
  tenants: [],
  rentals: [],
  payments: [],
  contracts: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TENANTS:
      return xtend(state, { tenants: action.payload });

    case ADD_PAYMENTS:
      return xtend(state, { payments: action.payload });

    case ADD_RENTALS:
      return xtend(state, { rentals: action.payload });

    case ADD_CONTRACTS:
      return xtend(state, { contracts: action.payload });

    default:
      return state;
  }
}

export default reducer;
