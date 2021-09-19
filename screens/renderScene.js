import * as React from "react";
import Payments from "./Payments";
import Rentals from "./Rentals";
import Tenants from "./Tenants";

const renderScene = (props, { route }) => {
  switch (route.key) {
    case "rentals":
      return <Rentals {...props} />;
    case "tenants":
      return <Tenants {...props} />;
    case "payments":
      return <Payments {...props} />;
    case "contracts":
      return <Rentals {...props} />;
    default:
      return null;
  }
};

export default renderScene;
