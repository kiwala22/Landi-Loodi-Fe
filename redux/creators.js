import { ADD_TENANTS } from "./types";

export function AddTenants(tenants) {
  return {
    type: ADD_TENANTS,
    payload: tenants,
  };
}
