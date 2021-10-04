import xtend from "xtend";
import ApiManager from "../api/ApiManager";
import { ADD_CONTRACTS, ADD_PAYMENTS, ADD_RENTALS, ADD_TENANTS } from "./types";

function processData(data, payload) {
  if (payload instanceof Array) {
    return payload;
  }

  data.push(payload);
  // alert(JSON.stringify(data));
  return data;
}

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
      let tenants = processData(state.tenants, action.payload);
      return xtend(state, { tenants });

    case ADD_PAYMENTS:
      let payments = processData(state.payments, action.payload);
      return xtend(state, { payments });

    case ADD_RENTALS:
      let rentals = processData(state.rentals, action.payload);
      return xtend(state, { rentals });

    case ADD_CONTRACTS:
      let contracts = processData(state.contracts, action.payload);
      return xtend(state, { contracts });

    default:
      return state;
  }
}

export default reducer;
