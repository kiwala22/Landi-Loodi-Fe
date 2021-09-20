import { ADD_RENTALS, ADD_TENANTS } from "./types";

export function AddTenants(tenants) {
  return {
    type: ADD_TENANTS,
    payload: tenants,
  };
}

export function AddRentals(rentals) {
  return {
    type: ADD_RENTALS,
    payload: rentals,
  };
}
